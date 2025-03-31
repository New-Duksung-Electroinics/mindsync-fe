import { useState } from "react";

// 개별 채팅 메시지 컴포넌트
const ChatMessage = ({ message, sender }) => {
  const isMe = sender === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs text-white ${
          isMe ? "bg-blue-500" : "bg-gray-700"
        }`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;