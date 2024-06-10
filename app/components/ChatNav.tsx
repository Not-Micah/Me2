"use client";

import { useActivePage } from "@/hooks/useActivePage"
import { IoSettingsSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const ChatNav = () => {
    const router = useRouter();

    const {currentPage, onChange} = useActivePage();

    const options = [
        {label: "Chat", onClick: () => onChange("chat")},
        {label: "Requests", onClick: () => onChange("requests")},
        {label: "New People", onClick: () => onChange("new people")}
    ]

  return (
    <div className='flex flex-row justify-between items-center flex-wrap
    w-full bg-gray-100 p-3 rounded-md'>
        <div className="flex flex-row justify-start items-cetner gap-x-5">
            {
                options.map((option, index) => (
                    <button key={index} className={`rounded-full px-5 py-1
                        ${currentPage === option.label.toLowerCase() ? "bg-cyan-300/30 font-semibold" : "bg-gray-500/10"}`}
                    onClick={option.onClick}>
                        {option.label}
                    </button>
                ))
            }
        </div>
        <button onClick={() => router.replace("./settings")} className="flex justify-center items-center mr-2 text-gray-700"><IoSettingsSharp size={20} /></button>
    </div>
  )
}

export default ChatNav