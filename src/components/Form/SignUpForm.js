import React, { useState, useEffect } from 'react';
import { joinUser, checkEmail } from '../../services/user.js';
import getQuestions  from "./questions.js";

function SignupForm() {

  const [step, setStep] = useState(1); // 1단계: 기본 정보 입력, 2단계: 질문지 입력
  
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [name, setName] = useState('');

  const [mbti, setMbti] = useState('');
  
  const [answers, setAnswers] = useState({}); // 초기 상태는 빈 객체

  const [userAnswers, setUserAnswers] = useState(
    Array.from({ length: 4 }, () => Array(3).fill(null))
  );

  const questions = getQuestions(name);

  const saveAnswer = (row, col, answerKey) => {
    setUserAnswers((prev) => {
      // ✅ prev(이전 상태)를 복사하여 새로운 배열을 생성해야 함
      const updatedAnswers = prev.map((arr) => [...arr]);
      updatedAnswers[row][col] = answerKey; // 새로운 값 할당
      return updatedAnswers;
    });
  };
 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const [error, setError] = useState('');
  
  const [emailError, setEmailError] = useState('');

  /* 회원가입 데이터 */
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    usermbti: '',
  });

    // 이메일 형식 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
    };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
        setEmailError('유효한 이메일 주소를 입력해주세요.');
    } else {
        setEmailError('');
    }
  };

    // 예시: fetch를 이용해 서버의 이메일 중복 확인 API를 호출하는 경우
  const handleEmailCheck = async (e) => {
     e.preventDefault();
      if (!email) {
      alert("이메일을 입력해주세요.");
      return;}
      // 회원가입 버튼 클릭 시 실행될 함수

    try {
      // 이메일 확인 먼저 수행
      const isEmailValid = await checkEmail(email);
      // 이메일이 유효하지 않으면 회원가입 진행하지 않음
      
      if (!isEmailValid) {
        alert('유효하지 않은 이메일입니다. 다시 확인해주세요.');
        return;
      }else{
        console.log('정상')
      }
      
    } catch (error) {
      alert(error.message || '아메일 확인 중 중 오류가 발생했습니다.');
      console.error('이메일 확인인 실패:', error);
    }
    };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setError('비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
    }
  };
  
  // 다음질문으로
  const handleNextQuestion = () => {
    const answer = userAnswers[Math.floor(currentQuestion / 3)][currentQuestion % 3];
    // 선택 안 했으면 alert 띄우기
    if (answer === null) {
      alert("🚨 답변을 선택해주세요!"); // 🚨 경고창
      return;
    }
    if(currentQuestion === questions.length - 1){
      console.log('마지막')
      alert('마지막')
    }
  
    if (currentQuestion < questions.length - 1) {
      console.log(currentQuestion)
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // 이전질문으로
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  useEffect(() => {
    console.log("formData가 업데이트되었습니다:", formData);
  }, [formData]);

  const handleAnswerChange = (questionNum, value, type) => {
    saveAnswer(type,questionNum,value)
    console.log(userAnswers);
    setAnswers((prev) => {
    const updatedAnswers = { ...prev, [questionNum]: value };
    return updatedAnswers;
    });
  };
  
  const getMostSelectedAnswers = (userAnswers) => {
    return userAnswers.map((columnAnswers) => {
      // ✅ 각 열(column)에서 등장 횟수 세기
      const countMap = columnAnswers.reduce((acc, answer) => {
        if (answer !== null) {
          acc[answer] = (acc[answer] || 0) + 1;
        }
        return acc;
      }, {});  
      // ✅ 가장 많이 선택된 값 찾기
      return Object.keys(countMap).reduce((a, b) =>
        countMap[a] >= countMap[b] ? a : b
      );
    });
  };

    // 회원가입 버튼 클릭 시 실행될 함수
  const handleSubmit = async (e) => {

    const resultMbti = getMostSelectedAnswers(userAnswers).join("")
    
    setMbti(resultMbti);

    setFormData({
      ...formData, // 기존 formData를 유지하고,
      email: email,
      password: password,
      username: name,
      usermbti: resultMbti,
    });

      e.preventDefault();
      
      try {
      const response = await joinUser(formData);
      alert('회원가입 성공! 🎉');
      console.log('회원가입 성공:', response);
        console.log('제출', formData);
      } catch (error) {
      alert(error.message || '회원가입 중 오류가 발생했습니다.');
      console.error('회원가입 실패:', error);
      } finally {
      }
    };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">회원가입</h2>
        <form >
      
          {/* 1단계: 기본 정보 입력 */}
          {step === 1 && (  
            <>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                />
              </div>

              <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      이메일
                  </label>
                  <div className="flex mt-1">
                      <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="이메일을 입력하세요"
                      value={email}
                      onChange={handleEmailChange}
                      className="w-full p-2 border border-gray-300 rounded-l-md"
                      />
                      <button
                      type="button"
                      onClick={handleEmailCheck} // 이메일 중복확인 로직 함수 연결
                      className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                      >
                      중복확인
                      </button>
                  </div>
              </div>
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>} {/* 오류 메시지 출력 */}

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="비밀번호를 확인하세요"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>} {/* 오류 메시지 출력 */}
              <button
                type="button"
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
                onClick={() => setStep(2)}
              >
                다음
              </button>
            </>
          )}

          {/* 2단계: 질문지 입력 */}
          {step === 2 && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold">{questions[currentQuestion].question}</h3>
                <div className="flex space-x-4 mt-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`py-2 px-4 border rounded-md transition-all duration-300
                          ${
                            userAnswers[questions[currentQuestion].type][questions[currentQuestion].questionNum] === option.key
                              ? 'bg-blue-500 text-white' // 선택된 옵션: 파란색 배경 + 흰색 글자
                              : 'bg-white border-gray-300 text-black hover:bg-gray-100' // 기본 상태: 흰색 배경 + 검은 글자 + hover 효과
                          }`}
                      onClick={() => handleAnswerChange(questions[currentQuestion].questionNum, option.key, questions[currentQuestion].type)}
                    >
                      {option.value}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                {/* 이전 버튼 */}
                {currentQuestion > 0 && (
                  <button
                    type="button"
                    className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                    onClick={handlePrevQuestion}
                  >
                    이전
                  </button>
                )}

                {/* 다음 버튼 */}
                {currentQuestion !== questions.length - 1 ? (
                  <button
                    type="button"
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleNextQuestion}
                  >
                    다음
                  </button>
                ) : (
                  <button
                    type="button"
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleSubmit}
                  >
                    회원가입
                  </button>
                )}
              </div>
            </>
          )}
        </form>
    </div>
  );
}

export default SignupForm;
