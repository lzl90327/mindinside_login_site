import { getApiBaseUrl } from "@/lib/auth/apiBase";

export type LoginRequestBody = {
  tenantId: number;
  username: string;
  password: string;
  rememberMe: boolean;
};

async function readErrorMessage(res: Response): Promise<string> {
  const text = await res.text();
  if (!text) return `请求失败 (${res.status})`;
  try {
    const j = JSON.parse(text) as { message?: string; error?: string; msg?: string };
    return j.message ?? j.error ?? j.msg ?? text;
  } catch {
    return text;
  }
}

export async function postLogin(body: LoginRequestBody): Promise<void> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }
}
