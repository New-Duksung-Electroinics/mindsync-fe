// 채팅방 생성 함수
export async function createChatRoom(title, participants, content, hostEmail, mbti, accessToken) {
    const url = 'http://yourapiurl/api/chat/room'; // 실제 API 엔드포인트로 변경

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`  // Bearer 방식으로 accessToken 추가
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

// 예시 사용
const accessToken = 'your_access_token_here';  // 실제 access token
const roomId = createChatRoom(
    '프로젝트 회의', 
    ['user1@example.com', 'user2@example.com'], 
    '프로젝트 일정 조율 및 진행 사항 공유', 
    'test@test.com', 
    'ESFP', 
    accessToken
);

console.log('생성된 채팅방 ID:', roomId);
