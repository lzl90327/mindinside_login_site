import { getApiBaseUrl } from "@/lib/auth/apiBase";

export type ForgotContactType = "phone" | "email";

export type ForgotSendCodeBody = {
  type: ForgotContactType;
  target: string;
  tenantId?: number;
};

export type ForgotResetBody = {
  type: ForgotContactType;
  target: string;
  code: string;
  newPassword: string;
  tenantId?: number;
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

export async function postForgotPasswordSendCode(body: ForgotSendCodeBody): Promise<void> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/v1/auth/forgot-password/send-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }
}

export async function postForgotPasswordReset(body: ForgotResetBody): Promise<void> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/v1/auth/forgot-password/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }
}
