"use client";

// Library Imports
import { useState, useEffect } from "react";
import { DocumentData } from "firebase/firestore";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

// Own Function Imports
import { useData } from "@/providers/DataProvider";
import { getUser } from "@/app/utils/usersfunctions";
import { deleteRequest, acceptRequest } from "@/app/utils/requestfunctions";

// Component Imports
import UserCard from "../UserCard";

const getRequestHook = async (
  requests: DocumentData[] | null | undefined,
  status: string,
  setUsers: Function
) => {
  const userData: DocumentData[] = [];
  const index = status === "sent" ? 1 : status === "received" ? 0 : -1;

  if (requests) {
    for (const request of requests) {
      const user = await getUser(request.ids[index]);
      if (user) userData.push(user);
    }
    setUsers(userData);
  }
};

const RequestSection = () => {
  // Section is either "sent" or "received"
  const [section, setSection] = useState("sent");
  const [requestList, setRequestList] = useState<DocumentData[] | null | undefined>([]);
  const { sentRequests, receivedRequests, user } = useData();

  const [sentRequestUsers, setSentRequestUsers] = useState<DocumentData[]>([]);
  const [receivedRequestUsers, setReceivedRequestUsers] = useState<DocumentData[]>([]);

  useEffect(() => {
    getRequestHook(sentRequests, "sent", setSentRequestUsers);
    getRequestHook(receivedRequests, "received", setReceivedRequestUsers);
  }, [sentRequests, receivedRequests]);

  useEffect(() => {
    if (section === "sent") {
      setRequestList(sentRequestUsers);
    } else {
      setRequestList(receivedRequestUsers);
    }
  }, [section, sentRequestUsers, receivedRequestUsers]);

  const handleDeleteRequest = async (chatid: string, index: number) => {
    await deleteRequest(chatid);
    setSentRequestUsers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAcceptRequest = async (chatid: string, index: number, request: DocumentData) => {
    await acceptRequest(chatid, user?.uid, request?.uid);
    setReceivedRequestUsers((prev) => prev.map((req, i) => (i === index ? { ...req, activeState: "active" } : req)));
  };

  return (
    <div className="ml-2 flex flex-col gap-y-3">
      <h3 className="text-2xl mb-6">Manage Requests</h3>
      <div className="w-full flex flex-row justify-start items-center gap-x-2 mb-5">
        <button
          onClick={() => setSection("sent")}
          className={`bg-gray-200 rounded-lg p-2 ${section === "sent" ? "font-bold" : ""}`}
        >
          Sent
        </button>
        <button
          onClick={() => setSection("received")}
          className={`bg-gray-200 rounded-lg p-2 ${section === "received" ? "font-bold" : ""}`}
        >
          Received
        </button>
      </div>
        {requestList?.map((request, index) => (
          <div key={index} className="flex flex-row justify-start items-center w-full
          user-card-accent">
            <UserCard
              onClick={() => {
                // console.log("Here");
              }}
              className={`flex-grow`}
              status="Compatibility 80%"
              user={request}
            />
            <button
              className="mr-8"
              onClick={() => {
                if (user && request) {
                  const chatid =
                    user.uid > request.uid ? user.uid + request.uid : request.uid + user.uid;

                  if (section === "sent") {
                    handleDeleteRequest(chatid, index);
                  } else if (section === "received") {
                    handleAcceptRequest(chatid, index, request);
                  }
                }
              }}
            >
              {section === "sent" ? <IoCloseCircleSharp size={20} /> : <FaCheckCircle size={20} />}
            </button>
          </div>
        ))}
    </div>
  );
};

export default RequestSection;
