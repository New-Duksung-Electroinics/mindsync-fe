const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
      const response = await fetch(`${API_BASE_URL}/v1/user/join`, {
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
  console.log('API_BASE_URL:', API_BASE_URL); 
    try {
        // 로그인 요청
        const response = await fetch(`${API_BASE_URL}/v1/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), 
            credentials: 'include',
        });

        if (!response.ok) {
            // 에러 응답 처리
            const errorData = await response.json();
            throw new Error(errorData.message || '로그인에 실패했습니다.');
        }

        const { status, message, data } = await response.json();
        const accessToken = response.headers.get('access');

        if (status === 'SUCCESS') {
            console.log('로그인 성공:',data);

            return {
              ...data,
              useremail: email,  // 추가할 useremail 값
              accessToken,
          };
        } else {
            console.log('로그인 실패:', message);
        }
    } catch (error) {
        console.error('로그인 과정 중 오류 발생:', error.message);
    }
}

export async function checkEmail(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/user/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
  
      if (response.ok) {
        if (data.status === "ERROR") {
          console.log(data.message);
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
      const response = await fetch(`${API_BASE_URL}/v1/user/logout`, {
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
  

  