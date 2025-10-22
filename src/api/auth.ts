// 회원가입 / 로그인 API 호출 모듈
export type SignupPayload = {
  email: string;
  password: string;
  username: string;
  usermbti: string; // 예: "ESFP"
};


export async function signup(payload: SignupPayload) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const res = await fetch(`${BASE_URL}/v1/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // 서버가 201/200이 아닐 수도 있으니 방어
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // JSON 아닐 수 있음 → 그대로 text 유지
  }

  if (!res.ok) {
    const msg = data?.message || data?.detail || text || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}
