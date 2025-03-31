import { useState } from "react";
import ChatMessage from "./ChatMessage"
// 채팅 창 컴포넌트
const ChatWindow = ({ messages }) => {
    return (
      <div className="flex flex-col p-4 space-y-2 overflow-y-auto h-[90%] bg-gray-100">
        {messages.map((msg, index) => (
          <ChatMessage key={index} {...msg} />
        ))}
      </div>
    );
  };

  export default ChatWindow;