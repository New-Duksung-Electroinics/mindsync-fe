import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("로그인 API 명세 받으면 연결할게요!");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white text-neutral-800">
      <main className="mx-auto max-w-md p-4 md:p-6">
        <h1 className="text-2xl font-bold">로그인</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4 bg-white/90 rounded-2xl border border-lime-200 p-4">
          <div>
            <label className="block text-sm font-medium mb-1">이메일</label>
            <input
              type="email"
              className="w-full rounded-xl border border-lime-300 px-3 py-2 outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">비밀번호</label>
            <input
              type="password"
              className="w-full rounded-xl border border-lime-300 px-3 py-2 outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="rounded-2xl bg-lime-600 text-white px-4 py-2 font-medium hover:bg-lime-700"
          >
            로그인
          </button>

          <p className="text-sm">
            계정이 없나요?{" "}
            <Link className="text-lime-700 underline" to="/signup">
              회원가입
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
