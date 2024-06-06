"use state"

import { useRef, useState } from "react";

import { getMessages, sendMessage } from "../utils/databasefunctions";
import ChatMessage from "./ChatMessage";

const ChatContainer = () => {
    const messages = getMessages();

    const [formValue, setFormValue] = useState("");
    const dummy = useRef<HTMLDivElement>(null);
  
    const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
      sendMessage(e, formValue, setFormValue, dummy);
    };
  
    return (
      <div className="">
        <div>
          <div className="font-bold text-xl mb-2">
            Chat:
          </div>
          {messages &&
            messages.map((msg, index) => (
              <ChatMessage key={index} document={msg} />
            ))}
        </div>
        <div ref={dummy}></div>
        <form onSubmit={handleSubmit} className="mt-5">
          <input value={formValue} onChange={((e) => setFormValue(e.target.value))} type="text"/>
          <button type="submit" className="ml-5">Send</button>
        </form>
      </div>
    );
  };

export default ChatContainer
  
  