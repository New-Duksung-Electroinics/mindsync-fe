import { useState } from "react";

// 개별 채팅 메시지 컴포넌트
const ChatMessage = ({ message, sender, username }) => {
  
  const isMe = sender === "me";

    // 이름 기반 색상 생성 함수
    const getColorFromName = (name = "unknown") => {
      const colors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6'];
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      const index = Math.abs(hash) % colors.length;
      return colors[index];
    };

    const initial = username? username.charAt(0).toUpperCase() : "X";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      {!isMe && (
        <div className="flex flex-col items-center mr-2">
           <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: getColorFromName(username) }}
          >
            {initial}
          </div>
          <span className="text-xs text-gray-600">{username? username: 'unknown'}</span>
        </div>
      )}

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