import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo/logo.svg'; // SVG 파일 경로

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
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
        <Link to="/auth" className="text-gray-600 hover:text-gray-900">
          로그인/회원가입
        </Link>
      </nav>
    </header>
  );
};

export default Header;
