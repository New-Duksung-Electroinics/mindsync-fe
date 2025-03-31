import React, { useState, useEffect } from 'react';
import { login } from '../../services/user.js'; // 로그인 API 함수 불러오기
import { useDispatch, useSelector } from 'react-redux';
import { setUsername } from 'src/store/authSlice.js';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const dispatch = useDispatch();  // 디스패치 함수 호출
  const username = useSelector(state => state.auth.username);  // Redux 상태에서 username 가져오기

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이메일과 비밀번호 유효성 검사
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력하세요.');
      return;
    }
    setLoading(true); // 로딩 시작
    try {
      const response = await login(email, password);

      // 로그인 성공 후 처리
      console.log('로그인 성공 in LoginForm:', response.username);
      
      // 로그인 성공 후 리디렉션하거나 토큰 저장 등의 처리를 추가할 수 있습니다.
       // 로그인 성공 후 사용자명 저장 (response.username은 실제 API 응답에서 받아오는 사용자명이어야 합니다)
       if (response && response.username) {

        console.log('ㅇㅅㅇ',response.data)
        dispatch(setUsername(response.username));  // Redux 상태에 사용자명 저장
      
      }

    } catch (error) {
      // 로그인 실패 시 에러 처리
      console.error('로그인 실패:', error.message);
      setError(error.message);  // 에러 메시지 표시
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

    // 상태 변화 후 username을 로그로 확인
    useEffect(() => {
      console.log('저장된 사용자명:', username);  // 상태가 변경될 때마다 출력
    }, [username]);


  return (
    <div className="w-[28vw] h-[48vh] mx-auto p-16 border rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          아직 계정이 없으신가요?{' '}
          <a href="/auth/signup" className="text-blue-500 hover:text-blue-700">
            회원가입
          </a>
        </p>
      </div>
      
    </div>
  );
}

export default LoginForm;
