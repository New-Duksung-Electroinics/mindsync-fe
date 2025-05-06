import { Client } from "@stomp/stompjs";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function createChatRoom(title, participants, content, hostEmail, mbti, accessToken) {
    const url = `${API_BASE_URL}/v1/chat/room`; 
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };
    const body = JSON.stringify({
        title: title,
        participants: participants,
        content: content,
        host_email: hostEmail,
        mbti: mbti
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        // 응답 결과 처리
        if (response.ok) {
            const data = await response.json();
            if (data.status === 'SUCCESS') {
                console.log('방 생성 성공:', data.data.roomId);
                return data.data.roomId;
            } else {
                console.error('방 생성 실패:', data.message);
                return null;
            }
        } else {
            const errorData = await response.json();
            console.error('서버 에러:', errorData.message);
            return null;
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        return null;
    }
}

let stompClient = null;

//stomp로 websocket 연결
export async function connectWebSocketWithStomp(token, roomId, onMessageCallback) {
  
  if (!token) {
    console.error("🚫 토큰이 없습니다.");
    return;
  }

    // STOMP Client 생성
  stompClient = new Client({
    brokerURL: `ws://211.47.114.99:10/v1/ws-chat/websocket?token=${token}`,
    debug: (str) => console.log("STOMP Debug:", str),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    // STOMP로 WebSocket 연결
    onConnect: (frame) => {
      console.log("✅ STOMP 연결 성공", frame);
    
    // STOMP 채팅 채널 구독
      stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
        console.log("📩 받은 메시지:", message.body);
        if (onMessageCallback) {
          onMessageCallback(JSON.parse(message.body));
        }
      });
    },
    onStompError: (frame) => {
      console.error("❌ STOMP 에러 발생", frame.headers["message"]);
      console.error("🔍 상세 내용:", frame.body);
    },
  });
  stompClient.activate();
}

export async function sendStompMessage(destination, messageObj) {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: destination,
        body: JSON.stringify(messageObj),
      });
      console.log("📤 메시지 전송:", messageObj);
    } else {
      console.error("🚫 STOMP 클라이언트가 연결되지 않았습니다.");
    }
  }
  