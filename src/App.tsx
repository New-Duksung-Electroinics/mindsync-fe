import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <header className="border-b border-lime-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold">
            <span className="text-lime-600">mind</span>-sync
          </Link>
          <nav className="flex gap-3 text-sm">
            <Link to="/login" className="rounded-xl border px-3 py-1 border-lime-300 hover:bg-lime-50">로그인</Link>
            <Link to="/signup" className="rounded-xl bg-lime-600 text-white px-3 py-1 hover:bg-lime-700">회원가입</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-[calc(100vh-56px)] bg-gradient-to-b from-lime-50 to-white flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-extrabold">
                  <span className="text-lime-600">Mind-Sync</span> — 회의, 더 똑똑하게
                </h1>
                <p className="mt-3 text-neutral-600">AI로 회의 안건을 빠르게 만들고, 액션아이템을 정리하세요.</p>
                <div className="mt-5 flex gap-3 justify-center">
                  <Link to="/signup" className="rounded-2xl bg-lime-600 text-white px-4 py-2 font-medium hover:bg-lime-700">
                    무료로 시작하기
                  </Link>
                  <Link to="/login" className="rounded-2xl border border-lime-300 bg-white px-4 py-2 font-medium hover:bg-lime-50">
                    로그인
                  </Link>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <footer className="border-t border-lime-200 text-sm text-neutral-500">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Mind-Sync</span>
          <div className="flex gap-4">
            <a className="hover:text-neutral-700" href="#">개인정보처리방침</a>
            <a className="hover:text-neutral-700" href="#">이용약관</a>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}
