import React, { useState } from "react";
import MBTISurvey from "../components/MBTISurvey";
import { signup } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [usermbti, setUsermbti] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const canSubmit =
    email.includes("@") &&
    username.trim().length >= 2 &&
    password.length >= 8 &&
    usermbti.length === 4;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);
    if (!canSubmit) {
      setErr("입력값을 확인해주세요.");
      return;
    }
    setLoading(true);
    try {
      await signup({ email, password, username, usermbti });
      setOk("회원가입 완료! 로그인 화면으로 이동합니다.");
      setTimeout(() => nav("/login"), 900);
    } catch (e: any) {
      setErr(e?.message || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white text-neutral-800">
      <main className="mx-auto max-w-3xl p-4 md:p-6">
        <h1 className="text-2xl font-bold">회원가입</h1>
        <p className="mt-1 text-neutral-600">
          이메일/비밀번호와 간단한 MBTI 설문을 통해 회의 경험을 개인화해요.
        </p>

        {/* 우측 MBTI 설문 */}
        <section className="space-y-4 bg-white/90 rounded-2xl border border-lime-200 p-4">
        <MBTISurvey value={usermbti} onChange={setUsermbti} disabled={loading} />
        </section>

        <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 좌측 기본 정보 */}
          <section className="space-y-4 bg-white/90 rounded-2xl border border-lime-200 p-4">
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
              <label className="block text-sm font-medium mb-1">이름</label>
              <input
                className="w-full rounded-xl border border-lime-300 px-3 py-2 outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="이수진"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">비밀번호</label>
              <input
                type="password"
                className="w-full rounded-xl border border-lime-300 px-3 py-2 outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="영문/숫자 포함 8자 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <p className="mt-1 text-xs text-neutral-500">예: 1234qwer! (기호 포함 가능)</p>
            </div>

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="rounded-2xl bg-lime-600 text-white px-4 py-2 font-medium hover:bg-lime-700 disabled:opacity-60"
            >
              {loading ? "처리 중…" : "회원가입"}
            </button>

            <p className="text-sm">
              이미 계정이 있나요?{" "}
              <Link className="text-lime-700 underline" to="/login">
                로그인
              </Link>
            </p>

            {err && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}
            {ok && <div className="rounded-xl border border-lime-200 bg-lime-50 px-3 py-2 text-sm text-lime-700">{ok}</div>}
          </section>

        </form>
      </main>
    </div>
  );
}
