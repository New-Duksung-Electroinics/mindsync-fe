import { useState } from "react";
import { Menu } from "lucide-react";
// 참여자 목록 컴포넌트
// 참여자 목록 컴포넌트 (접힘 기능 추가)
const ParticipantList = ({ isOpen, toggleOpen }) => {
  const participants = ["이수진", "문지영", "박해인", "강지헌 교수님"];

  return (
    <div className={`transition-all duration-300 ${isOpen ? "w-1/4" : "w-16"} bg-gray-200 p-4 border-r h-screen flex flex-col`}>
      <button onClick={toggleOpen} className="mb-2 p-2 bg-gray-400 text-white rounded">
        <Menu size={20} />
      </button>
      {isOpen && (
        <div>
          <h2 className="font-bold text-lg mb-2">참여자</h2>
          <ul>
            {participants.map((name, index) => (
              <li key={index} className="py-1 text-gray-700">{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ParticipantList;