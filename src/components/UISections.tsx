import React from "react";
import { Logo, Button, Input } from "./UIPrimitives";

export function Navbar({ onNav, active }: { onNav: (t: "home" | "login" | "signup") => void; active: "home" | "login" | "signup" }) {
  return (
    <header className="sticky top-0 z-10 border-b border-lime-200 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Logo />
        <nav className="hidden sm:flex items-center gap-2 text-sm">
          <Button variant={active === "home" ? "primary" : "outline"} onClick={() => onNav("home")}>Home</Button>
          <Button variant={active === "login" ? "primary" : "outline"} onClick={() => onNav("login")}>Login</Button>
          <Button variant={active === "signup" ? "primary" : "outline"} onClick={() => onNav("signup")}>Sign up</Button>
        </nav>
      </div>
    </header>
  );
}

export function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="pt-10 md:pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-lime-200 bg-white px-3 py-1 text-xs font-medium text-lime-700">
            <span>✨ New</span> AI-powered meeting flow
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
           <span className="text-lime-600">Mind-Sync</span>로 더 똑똑하게 회의를 계획하세요
          </h1>
          <p className="mt-3 text-neutral-600">
            Generate agendas, track decisions, and capture action items — all in a clean, cute lime UI.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Button onClick={onGetStarted}>지금 바로 시작하기</Button>
            <Button variant="outline" onClick={() => window.alert("Demo coming soon ✨")}>데모 보기</Button>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-neutral-700">
            <li className="flex items-center gap-2"><Dot /> No setup</li>
            <li className="flex items-center gap-2"><Dot /> Fast & responsive</li>
            <li className="flex items-center gap-2"><Dot /> Cute but professional</li>
            <li className="flex items-center gap-2"><Dot /> Exports Markdown</li>
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-3xl border border-lime-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-lime-500" />
              <span className="inline-block h-2 w-2 rounded-full bg-lime-400" />
              <span className="inline-block h-2 w-2 rounded-full bg-lime-300" />
              <span className="ml-2 font-medium">Agenda Preview</span>
            </div>
            <ul className="space-y-2">
              {["Welcome & Goals (5m)","Team Updates (10m)","AI Suggestions (15m)","Decisions & Owners (10m)","Next Steps (5m)"].map((t, i) => (
                <li key={i} className="rounded-2xl border border-lime-100 bg-white p-3 flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-lime-500" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeatureCard({ title, emoji, desc }: { title: string; emoji: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-lime-200 bg-white/80 p-5 shadow-sm">
      <div className="text-2xl">{emoji}</div>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-neutral-600">{desc}</p>
    </div>
  );
}

export function CTA({ onClick }: { onClick: () => void }) {
  return (
    <section className="my-12">
      <div className="rounded-3xl border border-lime-300 bg-gradient-to-r from-lime-100 to-lime-50 p-6 md:p-8 text-center">
        <h3 className="text-xl md:text-2xl font-bold">회의 시작할 준비 되셨나요?</h3>
        <p className="mt-1 text-neutral-700">회원가입 후 바로 AI 회의 안건을 만들어보세요.</p>
        <div className="mt-4">
          <Button onClick={onClick}>Create free account</Button>
        </div>
      </div>
    </section>
  );
}

export function AuthCard({ mode, onSwitch }: { mode: "login" | "signup"; onSwitch: () => void }) {
  return (
    <section className="pt-10">
      <div className="mx-auto max-w-md rounded-3xl border border-lime-200 bg-white/90 p-6 shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Logo />
        </div>
        <h2 className="text-xl font-semibold text-center">
          {mode === "login" ? "다시 오신 걸 환영해요." : "계정을 만들어보세요."}
        </h2>
        <p className="mt-1 text-center text-sm text-neutral-600">
          {mode === "login" ? "Mind-Sync를 계속 사용하려면 로그인하세요." : "Mind-Sync에 가입하고 더 똑똑하게 회의를 준비하세요."}
        </p>

        <form
          className="mt-5 space-y-3"
          onSubmit={(e) => { e.preventDefault(); alert(`${mode} submitted`); }}
        >
          <Input label="Email" type="email" placeholder="you@example.com" required />
          <Input label="Password" type="password" placeholder="••••••••" required />
          {mode === "signup" && <Input label="Name (optional)" placeholder="Soo" />}

          <Button type="submit" className="w-full">{mode === "login" ? "Login" : "Sign up"}</Button>
        </form>

        <p className="mt-3 text-center text-sm text-neutral-600">
          {mode === "login" ? (
            <>New here? <a className="text-lime-700 underline cursor-pointer" onClick={onSwitch}>Create account</a></>
          ) : (
            <>Already have an account? <a className="text-lime-700 underline cursor-pointer" onClick={onSwitch}>Login</a></>
          )}
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-14 border-t border-lime-200">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2"><Logo /><span>© {new Date().getFullYear()} Mind-Sync</span></div>
        <div className="flex gap-4">
          <a className="hover:text-neutral-700" href="#">Privacy</a>
          <a className="hover:text-neutral-700" href="#">Terms</a>
          <a className="hover:text-neutral-700" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function Dot() {
  return <span className="inline-block h-2 w-2 rounded-full bg-lime-500" />;
}
