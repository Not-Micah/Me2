"use client"

import { useState } from "react"
import { sendMessage } from "@/app/utils/chatfunctions";
import { useActiveUserChat } from "@/hooks/useActiveUserChat"
import { MdFileUpload } from "react-icons/md";
import { IoSend } from "react-icons/io5";

interface MessageFormProps {
    setSending: Function,
    targetRef: React.RefObject<HTMLDivElement>;
}

const MessageForm: React.FC<MessageFormProps> = ({ setSending, targetRef }) => {
  const { currentChat } = useActiveUserChat();
  const [formValue, setFormValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    sendMessage(e, currentChat, formValue, setFormValue, setSending);
    setSending(true);
  };

  return (
    <form className="flex flex-row
    bg-primary rounded-lg p-2 mt-8" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center mx-4">
          <MdFileUpload size={30} />
        </div>
        <div className="bg-white rounded-full flex flex-grow px-4 py-3">
          <input
            type="text"
            placeholder="Enter Message..."
            className="flex-grow outline-none bg-transparent ml-5"
            value={formValue}
            onChange={(e) => {
              setFormValue(e.target.value)
            }}
            />
            <button type="submit" className="text-black flex justify-center items-center">
              <IoSend size={20} />
            </button>
        </div>
      </form>
  )
}

export default MessageForm