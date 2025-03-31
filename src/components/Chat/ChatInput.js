import { useState } from "react";
// 채팅 입력창 컴포넌트
const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState("");
  
    const sendMessage = () => {
      if (message.trim()) {
        onSend(message);
        setMessage("");
      }
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