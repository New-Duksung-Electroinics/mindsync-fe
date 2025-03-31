// 채팅방 페이지 컴포넌트
import { useState } from "react";
import ChatWindow from "src/components/Chat/ChatWindow";
import ChatInput from "src/components/Chat/ChatInput";
import ParticipantList from "src/components/Chat/ParticipantList";

// 채팅방 페이지 컴포넌트
const ChatRoom = () => {
    const [messages, setMessages] = useState([
      { sender: "other", message: "안녕하세요!" },
      { sender: "me", message: "안녕하세요! mindsync 개발팀 입니다." },
      { sender: "other", message: "채팅이 무사히 구현되었음 좋겠어요" },
      { sender: "me", message: "세상은 왜이리 살기 힘들까요?" },
      { sender: "other", message: "하하 원래 다 그런거죠" }
    ]);
  
    const [isOpen, setIsOpen] = useState(true);
    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSendMessage = (text) => {
      setMessages([...messages, { sender: "me", message: text }]);
    };
  
    return (
    <div className="flex h-[100%]">
      <ParticipantList isOpen={isOpen} toggleOpen={toggleOpen} />
      <div className="flex flex-col flex-grow border-l shadow-lg bg-white">
        <div className="p-4 bg-blue-500 text-white font-bold text-lg">그룹 채팅방</div>
        <ChatWindow messages={messages} />
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
    );
  };
  
  export default ChatRoom;