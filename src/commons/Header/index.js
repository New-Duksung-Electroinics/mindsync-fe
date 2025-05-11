import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo/logo.svg'; // SVG 파일 경로
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync as logout } from '../../store/authSlice'; // 로그아웃 액션
import { useEffect } from 'react';


const Header = () => {
  const dispatch = useDispatch();
  
  const { isLoggedIn, username, useremail, accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("isLoggedIn changed:", isLoggedIn);
  },[isLoggedIn])


  const handleLogout = () => {
    dispatch(logout(accessToken)); // 로그아웃 액션 디스패치
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="MyService Logo" width={100} />
      </div>
      <nav className="flex items-center space-x-6">
        <Link to="/service" className="text-pink-600 hover:text-gray-900">
          서비스소개
        </Link>
        <Link to="/company" className="text-gray-600 hover:text-gray-900">
          회사소개
        </Link>
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-semibold whitespace-nowrap">
              {username}님 환영합니다!
            </span>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-gray-900"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <Link to="/auth" className="text-gray-600 hover:text-gray-900">
            로그인/회원가입
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
