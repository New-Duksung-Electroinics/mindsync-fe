// src/api/user.js
/**
 * 회원가입 API 호출
 * @param {Object} data - 회원가입에 필요한 데이터
 * @param {string} data.email - 이메일
 * @param {string} data.password - 비밀번호
 * @param {string} data.nickname - 닉네임
 * @param {string} data.usermbti - 사용자 MBTI (예: "ESFP")
 * @returns {Promise<Object>} API 응답 결과
 */

export async function joinUser(data) {
    try {
      const response = await fetch(`http://211.47.114.99:10/api/user/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        // 에러 응답 처리: 응답 본문을 파싱 후 에러를 던집니다.
        const errorData = await response.json();
        throw new Error(errorData.message || '회원가입에 실패했습니다.');
      }
  
      return await response.json();
    } catch (error) {
      // 호출하는 쪽에서 에러 처리를 할 수 있도록 에러를 던집니다.
      throw error;
    }
  }
  
/**
 * 로그인 API 요청 함수
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise<Object>} 로그인 응답 결과
 */
export async function login(email, password) {
    try {
        // 로그인 요청
        const response = await fetch(`http://211.47.114.99:10/api/user/login`, {
            method: 'POST',  // HTTP 메서드는 'POST'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),  // JSON.stringify로 바디 설정
            credentials: 'include',  // 쿠키를 포함한 요청
        });

        if (!response.ok) {
            // 에러 응답 처리
            const errorData = await response.json();
            throw new Error(errorData.message || '로그인에 실패했습니다.');
        }

        const { status, message, data } = await response.json();

        if (status === 'SUCCESS') {
            console.log('로그인 성공:',data);
            // console.log('사용자명:', data.username);
            // console.log('Access Token:', response.headers.get('access')); // access token 헤더 값 확인
            // console.log('Refresh Token:', document.cookie.refresh);  // 쿠키에서 refresh token 확인

            return data;
        } else {
            console.log('로그인 실패:', message);
        }
    } catch (error) {
        console.error('로그인 과정 중 오류 발생:', error.message);
    }
}

// user.js
export async function checkEmail(email) {
    try {
      const response = await fetch('http://211.47.114.99:10/api/user/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
  
      if (response.ok) {
        if (data.status === "ERROR") {
          console.log(data.message); // "이미 가입된 사용자입니다."
        } else {
          console.log('사용 가능한 이메일입니다.');
        }
      } else {
        throw new Error(data.message || '에러 발생');
      }
    } catch (error) {
      console.error('이메일 확인 중 오류 발생:', error);
    }
  }


  export async function logout(){
    try {
      const response = await fetch('http://211.47.114.99:10/api/user/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if(response.ok){
        console.log('logout success : ', data.message);
        return data;
      } else {
        console.error('logout fail : ', data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('server error', error);
      throw error;
    }
    
  }
  

  