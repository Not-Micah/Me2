// Hook Imports
import { useData } from "@/providers/DataProvider";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import { useActivePage } from "@/hooks/useActivePage";

import { IoIosClose } from "react-icons/io";

// Own Function Imports
import { useConfirmationModal } from "@/hooks/useConfirmationModal";
import { getTimeLeft } from "../utils/utilfunctions";
import { deleteChat, checkNotificationStatus } from "../utils/chatfunctions";
import { removeUserFromUserChats } from "../utils/usersfunctions";

// Component Imports
import UserCard from "./UserCard";
import { useEffect, useState } from "react";


// To Do: Clean Up Code (!)
const UserDisplay = () => {
  const { onChange, currentUser, setChatComplete } = useActiveUserChat();
  const { onChange: changePage, currentPage } = useActivePage();
  const { user, activeUsers } = useData();
  const { onModalOpen, setDeleteData } = useConfirmationModal();

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchTimeLeft = async (uid1: string, uid2: string) => {
      const chatid = uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;
      const hoursLeft = await getTimeLeft(chatid);

      setTimeLeft((prevTimeLeft) => ({
        ...prevTimeLeft, 
        [chatid]: Math.floor(hoursLeft ?? 0),
      }));
    };

    // Fetch the time left for each active user
    if (user && activeUsers) {
      activeUsers.forEach((u) => {
        fetchTimeLeft(user.uid, u.uid);
      });
    }
  }, [user, activeUsers]);

  return (
    <div className="flex flex-col justify-start items-start gap-y-3 min-w-[350px] h-full overflow-y-auto no-scrollbar
    max-lg:pb-6">
      <h3 className="text-2xl mb-6 ml-2 font-medium">Chats</h3>
      {activeUsers &&
        activeUsers.map((u, index) => {
          if (!user) return null;

          const chatid = user.uid > u.uid ? user.uid + u.uid : u.uid + user.uid;
          const hoursLeft = timeLeft[chatid] !== undefined ? `${timeLeft[chatid]} Hours` : "Loading...";

          const notification = checkNotificationStatus(chatid, user.uid);

          // To-Do Run Code Here
          // Should this code be here or in page.tsx?
          // And should removeUserFromUserChats be in deleteChat?
          console.log(timeLeft[chatid])

          if (timeLeft[chatid] <= 0) {
            deleteChat(chatid);
            removeUserFromUserChats(user.uid, u.uid);
            removeUserFromUserChats(u.uid, user.uid);
            console.log("Delete the chat!")
          } 

          return (
            <div
              key={index}
              className={`flex flex-row justify-between items-center gap-x-2 w-full user-card-primary
                ${currentUser === u && currentPage === "chat" ? "bg-accent" : ""}`}
            >
              <UserCard
                onClick={() => {
                  if (user) {
                    onChange(u, chatid);
                    changePage("chat");

                    // To-Do Run Code Her
                    if (timeLeft[chatid] <= 12 && timeLeft[chatid] > 0) {
                      setChatComplete(true);
                    } else {
                      setChatComplete(false);
                    }
                  }
                }}
                notification
                className={`${user && u.uid === user.uid ? "hidden" : ""}`}
                statusClassName="bg-white text-gray-700
                px-6 py-1 rounded-xl -ml-1 mt-1"
                status={hoursLeft}
                user={u}
              />
              <button
                className="mr-2"
                onClick={() => {
                  if (user) {
                    const deleteData = {
                      uid1: user.uid,
                      uid2: u.uid,
                      userName: u.userName,
                    };

                    setDeleteData(deleteData);
                    onModalOpen();
                  }
                }}
              >
                <IoIosClose size={30} />
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default UserDisplay;
