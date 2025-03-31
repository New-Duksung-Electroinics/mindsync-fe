import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo/logo.svg'; // SVG 파일 경로
import { useDispatch, useSelector } from 'react-redux';

import { logoutAsync } from 'src/store/authSlice'; // logoutAsync를 불러와야 함!

const Header = () => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth.username);  // Redux 상태에서 username 가져오기

  const handleLogout = () => {
    dispatch(logoutAsync()); // 로그아웃 액션 디스패치
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center h-60">
      <div className="text-2xl font-bold text-gray-800">
      <img src={logo} alt="MyService Logo" width={100} />
      </div>
      <nav className="space-x-6">
        <Link to="/service" className="text-pink-600 hover:text-gray-900">
          서비스소개
        </Link>
        <Link to="/company" className="text-gray-600 hover:text-gray-900">
          회사소개
        </Link>
        {username ? (
          // 로그인 상태일 때
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-semibold">{username}님 환영합니다!</span>
            <button onClick={handleLogout} className="text-red-600 hover:text-gray-900">
              로그아웃
            </button>
          </div>
        ) : (
          // 로그아웃 상태일 때
          <Link to="/auth" className="text-gray-600 hover:text-gray-900">
            로그인/회원가입
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
