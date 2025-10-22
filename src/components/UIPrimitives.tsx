import React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium transition-colors";
  const map: Record<ButtonVariant, string> = {
    primary: "bg-lime-600 text-white hover:bg-lime-700 active:bg-lime-800 disabled:opacity-60 shadow-sm",
    outline: "border border-lime-300 bg-white hover:bg-lime-50 text-neutral-800",
    ghost: "text-lime-700 hover:bg-lime-100",
  };
  return <button type={props.type ?? "button"} {...props} className={`${base} ${map[variant]} ${className}`} />;
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string };
export function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="block">
      <span className="block mb-1 text-sm font-medium">{label}</span>
      <input
        {...props}
        className={`w-full rounded-2xl border border-lime-300 bg-white/90 px-3 py-2 outline-none focus:ring-2 focus:ring-lime-400 ${className ?? ""}`}
      />
    </label>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="h-7 w-7" aria-hidden>
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#d9f99d" />
            <stop offset="100%" stopColor="#84cc16" />
          </linearGradient>
        </defs>
        <rect x="6" y="10" width="52" height="44" rx="14" fill="url(#g)" />
        <circle cx="24" cy="32" r="6" fill="#fff" />
        <circle cx="40" cy="24" r="5" fill="#fff" />
        <circle cx="42" cy="40" r="4" fill="#fff" />
      </svg>
      <span className="text-lg md:text-xl font-extrabold tracking-tight">
        <span className="text-lime-600">mind</span>-sync
      </span>
    </div>
  );
}
