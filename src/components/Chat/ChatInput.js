import { useState } from "react";
import { createChatRoom, connectWebSocket, connectWebSocketWithStomp, sendStompMessage } from 'src/services/chat.js'; // 경로에 따라 조정
// 채팅 입력창 컴포넌트
const ChatInput = ({ roomId, name, email, agendaId, onSend }) => {

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    // 문자열 양쪽 공백 제거 + 메세지가 비어 있으면 함수 실행을 멈추고 return 한다. 
    if (!message.trim()) return;

    const now = new Date();
    const formattedTimestamp = now.toISOString().replace("T", " ").substring(0, 19); // yyyy-MM-dd HH:mm:ss
    const messageObj = {
      roomId: roomId,
      timestamp: formattedTimestamp,
      name: name,
      email: email,
      message: message,
      agenda_id: agendaId,
    };

    sendStompMessage(`/app/chat/${roomId}/send`, messageObj);
    // ✅ 프론트 상태에도 추가 (화면에 표시되게 함)
    // 컴포넌트에서 전달된 콜백함수수
    onSend({
      sender: "me",
      message: message
    });

    // 메세지 입력창 초기화
    setMessage("");
  };

    return (
      <div className="flex p-2 border-t bg-white">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg outline-none"
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
    );
  };
  
  export default ChatInput;