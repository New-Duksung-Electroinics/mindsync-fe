import React, { useState } from "react";
import { Navbar, Hero, FeatureCard, CTA, AuthCard, Footer } from "../components/UISections";

export default function MindSyncUI() {
  const [tab, setTab] = useState<"home" | "login" | "signup">("home");

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 via-white to-white text-neutral-800">
      <Navbar onNav={setTab} active={tab} />

      <main className="mx-auto max-w-6xl px-4 md:px-6">
        {tab === "home" && (
          <>
            <Hero onGetStarted={() => setTab("signup")} />
            <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              <FeatureCard title="AI Agenda" emoji="🧠" desc="Generate clear, focused agendas from a short prompt." />
              <FeatureCard title="Action Items" emoji="✅" desc="Auto-extract tasks with owners and due dates." />
              <FeatureCard title="Realtime Notes" emoji="⚡" desc="Collaborative notes that feel fast and delightful." />
            </section>
            <CTA onClick={() => setTab("signup")} />
          </>
        )}
        {tab === "login" && <AuthCard mode="login" onSwitch={() => setTab("signup")} />}
        {tab === "signup" && <AuthCard mode="signup" onSwitch={() => setTab("login")} />}
      </main>

      <Footer />
    </div>
  );
}
