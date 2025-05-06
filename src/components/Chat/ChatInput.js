import { useState } from "react";
import { createChatRoom, connectWebSocket, connectWebSocketWithStomp, sendStompMessage } from 'src/services/chat.js'; // 경로에 따라 조정
// 채팅 입력창 컴포넌트
const ChatInput = ({ roomId, name, email, agendaId, onSend }) => {

  const [message, setMessage] = useState("");

  const sendMessage = () => {
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