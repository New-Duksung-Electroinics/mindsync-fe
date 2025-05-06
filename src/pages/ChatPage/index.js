// 채팅방 페이지 컴포넌트
import { useState,useEffect } from "react";
import ChatWindow from "src/components/Chat/ChatWindow";
import ChatInput from "src/components/Chat/ChatInput";
import ParticipantList from "src/components/Chat/ParticipantList";
import { useSearchParams, useLocation } from "react-router-dom";
import { agendaCreation, createAgenda } from 'src/services/agenda.js'
import { useSelector } from 'react-redux';  

// 채팅방 페이지 컴포넌트
const ChatRoom = () => {
  const { isLoggedIn, username, useremail, accessToken } = useSelector((state) => state.auth);
  const location = useLocation();
    // navigate 시 넘겨준 state 받기
  const roomId = location.state?.roomId;
  const meetingContent = location.state?.meetingContent;

  const [detailAgenda, setDetailAgenda] = useState(null);

  useEffect(() => {
    const fetchAgenda = async () => {
      const result = await agendaCreation(roomId, meetingContent);
      if (result?.data) {
        setDetailAgenda(result.data)
        console.log(result)
      }
    };
  
    fetchAgenda();
  }, [roomId]);

    const [messages, setMessages] = useState([
      { sender: "other", message: "안녕하세요!" },
      { sender: "me", message: "안녕하세요! mindsync 개발팀 입니다." },
      { sender: "other", message: "채팅이 무사히 구현되었음 좋겠어요" },
      { sender: "me", message: "세상은 왜이리 살기 힘들까요?" },
      { sender: "other", message: "하하 원래 다 그런거죠" }
    ]);
  
    const [isOpen, setIsOpen] = useState(true);
    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSendMessage = (newMessage) => {
      // 함수형 업데이트 이전 배열 복사하고 newMessage 추가해서 setMessage 한다.
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
  
    return (
    <div className="flex h-[100%]">
      <ParticipantList isOpen={isOpen} toggleOpen={toggleOpen} detailAgenda={detailAgenda} />
      <div className="flex flex-col flex-grow border-l shadow-lg bg-white">
        <div className="p-4 bg-blue-500 text-white font-bold text-lg">그룹 채팅방</div>
        <ChatWindow messages={messages} />
        <ChatInput
          roomId={roomId}
          name={username}
          email={useremail}
          agendaId={1}
          onSend={handleSendMessage}
        />
      </div>
    </div>
    );
  };
  
  export default ChatRoom;