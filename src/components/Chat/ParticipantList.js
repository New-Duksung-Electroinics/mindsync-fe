import { useState } from "react";
import { Menu } from "lucide-react";
// 참여자 목록 컴포넌트
// 참여자 목록 컴포넌트 (접힘 기능 추가)
const ParticipantList = ({ isOpen, toggleOpen, detailAgenda }) => {
  
  return (
    <div className={`transition-all duration-300 ${isOpen ? "w-1/4" : "w-16"} bg-gray-200 p-4 border-r h-screen flex flex-col`}>
      <button onClick={toggleOpen} className="mb-2 p-2 bg-gray-400 text-white rounded">
        <Menu size={20} />
      </button>
      {isOpen && (
        <div>
          <h2 className="font-bold text-lg mb-2">안건회의</h2>
          <ul>
            {detailAgenda
                ? Object.entries(detailAgenda).map(([key, value]) => (
                    <li key={key} className="py-1 text-gray-700">
                      <strong>{key}.</strong> {value}
                    </li>
                  ))
                : <li className="text-sm text-gray-500">안건이 생성중입니다...</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ParticipantList;