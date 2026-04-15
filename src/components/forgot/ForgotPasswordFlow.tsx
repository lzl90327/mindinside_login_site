import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_PATHS, type LoginRouteSystemId } from "@/config/routes";
import { SEND_CODE_COOLDOWN_SEC, VERIFICATION_CODE_LENGTH } from "@/lib/auth/constants";
import {
  postForgotPasswordReset,
  postForgotPasswordSendCode,
  type ForgotContactType,
} from "@/lib/auth/forgotPasswordApi";
import { getPasswordRuleChecks, passwordMeetsPolicy } from "@/lib/auth/passwordPolicy";
import type { LoginSystemConfig } from "@/types/login-system";
import "./ForgotPasswordFlow.css";

type Step = "input" | "verify" | "reset" | "done";

function optionalTenantId(raw: string): number | undefined {
  const t = raw.trim();
  if (!t) return undefined;
  const n = Number(t);
  return Number.isFinite(n) ? n : undefined;
}

function isValidPhone(s: string): boolean {
  return /^1\d{10}$/.test(s.trim());
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

function maskTarget(type: ForgotContactType, target: string): string {
  const t = target.trim();
  if (type === "phone") {
    if (t.length >= 7) return `${t.slice(0, 3)}****${t.slice(-4)}`;
    return t;
  }
  const at = t.indexOf("@");
  if (at <= 0) return t;
  const u = t.slice(0, at);
  const d = t.slice(at + 1);
  const keep = u.slice(0, Math.min(2, u.length));
  return `${keep}***@${d}`;
}

const POLICY_MSG = "密码必须包含字母和数字，长度 8-32 位";

export type ForgotPasswordFlowProps = {
  config: LoginSystemConfig;
  copyrightNotice: string;
};

export function ForgotPasswordFlow({ config, copyrightNotice }: ForgotPasswordFlowProps) {
  const returnLogin =
    LOGIN_PATHS[config.id as LoginRouteSystemId] ?? LOGIN_PATHS.wms;

  const [step, setStep] = useState<Step>("input");
  const [contactType, setContactType] = useState<ForgotContactType>("phone");
  const [tenantId, setTenantId] = useState("");
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = window.setTimeout(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => window.clearTimeout(t);
  }, [countdown]);

  const tenantOptional = optionalTenantId(tenantId);

  function buildSendCodeBody(): Parameters<typeof postForgotPasswordSendCode>[0] {
    const body: Parameters<typeof postForgotPasswordSendCode>[0] = {
      type: contactType,
      target: target.trim(),
    };
    const tid = optionalTenantId(tenantId);
    if (tid !== undefined) {
      body.tenantId = tid;
    }
    return body;
  }

  const validateInputStep = (): string | null => {
    if (!tenantId.trim()) return "请输入租户ID";
    if (tenantOptional === undefined) return "请输入租户ID";
    if (contactType === "phone") {
      if (!target.trim()) return "请输入有效的手机号";
      if (!isValidPhone(target)) {
        return target.trim().length > 0 ? "请输入有效的11位手机号" : "请输入有效的手机号";
      }
    } else if (!isValidEmail(target)) {
      return target.trim() ? "请输入有效的邮箱地址" : "请输入有效的邮箱地址";
    }
    return null;
  };

  const handleSendCode = async () => {
    setError(null);
    const v = validateInputStep();
    if (v) {
      setError(v);
      return;
    }
    setSending(true);
    try {
      await postForgotPasswordSendCode(buildSendCodeBody());
      setStep("verify");
      setCode("");
      setCountdown(SEND_CODE_COOLDOWN_SEC);
    } catch (e) {
      setError(e instanceof Error ? e.message : "发送验证码失败，请稍后重试");
    } finally {
      setSending(false);
    }
  };

  const handleVerifyNext = () => {
    setError(null);
    if (code.trim().length !== VERIFICATION_CODE_LENGTH) {
      setError("请输入验证码");
      return;
    }
    setStep("reset");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setError(null);
    setSending(true);
    try {
      await postForgotPasswordSendCode(buildSendCodeBody());
      setCountdown(SEND_CODE_COOLDOWN_SEC);
    } catch (e) {
      setError(e instanceof Error ? e.message : "发送验证码失败，请稍后重试");
    } finally {
      setSending(false);
    }
  };

  const handleReset = async () => {
    setError(null);
    if (newPassword !== confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }
    if (!passwordMeetsPolicy(newPassword)) {
      setError(POLICY_MSG);
      return;
    }
    setResetting(true);
    try {
      const body: Parameters<typeof postForgotPasswordReset>[0] = {
        type: contactType,
        target: target.trim(),
        code: code.trim(),
        newPassword,
      };
      if (tenantOptional !== undefined) {
        body.tenantId = tenantOptional;
      }
      await postForgotPasswordReset(body);
      setStep("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "密码重置失败，请稍后重试");
    } finally {
      setResetting(false);
    }
  };

  const checks = getPasswordRuleChecks(newPassword);

  const titleForStep =
    step === "done" ? null : (
      <h2 className="forgot-flow__title">
        {step === "input" ? "找回密码" : "重置密码"}
      </h2>
    );

  return (
    <div className="forgot-flow" data-step={step}>
      <div className="forgot-flow__card">
        {step === "done" ? (
          <>
            <h3 className="forgot-flow__success-title">密码重置成功</h3>
            <p className="forgot-flow__success-body">
              您的密码已成功重置，请使用新密码登录。
            </p>
            <p className="forgot-flow__success-meta">密码重置完成</p>
            <div className="forgot-flow__actions">
              <Link className="forgot-flow__btn forgot-flow__btn--primary" to={returnLogin}>
                返回登录
              </Link>
            </div>
            <p className="forgot-flow__copyright">{copyrightNotice}</p>
          </>
        ) : (
          <>
            <header className="forgot-flow__head">
              {titleForStep}
              {step === "input" ? (
                <p className="forgot-flow__subtitle">选择方式找回您的账号密码</p>
              ) : null}
              {step === "verify" ? (
                <p className="forgot-flow__subtitle">请输入收到的验证码</p>
              ) : null}
              {step === "reset" ? (
                <p className="forgot-flow__subtitle">设置您的新密码</p>
              ) : null}
            </header>

            {error ? (
              <p className="forgot-flow__alert" role="alert">
                {error}
              </p>
            ) : null}

            {step === "input" ? (
              <>
                <div className="forgot-flow__field">
                  <span className="forgot-flow__label">租户ID</span>
                  <input
                    className="forgot-flow__input"
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                    placeholder="请输入租户ID"
                    autoComplete="organization"
                  />
                </div>
                <div className="forgot-flow__field">
                  <span className="forgot-flow__label">验证方式</span>
                  <div
                  className="forgot-flow__segment"
                  role="radiogroup"
                  aria-label="验证方式"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={contactType === "phone"}
                    className={`forgot-flow__seg-btn ${contactType === "phone" ? "is-active" : ""}`}
                    onClick={() => setContactType("phone")}
                  >
                    手机号
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={contactType === "email"}
                    className={`forgot-flow__seg-btn ${contactType === "email" ? "is-active" : ""}`}
                    onClick={() => setContactType("email")}
                  >
                    邮箱
                  </button>
                </div>
                </div>
                <div className="forgot-flow__field">
                  <span className="forgot-flow__label">
                    {contactType === "phone" ? "手机号" : "邮箱地址"}
                  </span>
                  <input
                    className="forgot-flow__input"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder={
                      contactType === "phone" ? "请输入手机号" : "请输入邮箱地址"
                    }
                    type={contactType === "phone" ? "tel" : "email"}
                    autoComplete={contactType === "phone" ? "tel" : "email"}
                  />
                  {contactType === "phone" && target.trim().length > 0 && !isValidPhone(target) ? (
                    <p className="forgot-flow__hint">请输入有效的11位手机号</p>
                  ) : null}
                </div>
                <div className="forgot-flow__actions forgot-flow__actions--input">
                  <button
                    type="button"
                    className="forgot-flow__btn forgot-flow__btn--primary"
                    disabled={sending}
                    onClick={() => void handleSendCode()}
                  >
                    {sending ? "发送中..." : "获取验证码"}
                  </button>
                  <Link className="forgot-flow__btn forgot-flow__btn--ghost" to={returnLogin}>
                    返回登录
                  </Link>
                </div>
              </>
            ) : null}

            {step === "verify" ? (
              <>
                <p className="forgot-flow__verify-sent">
                  验证码已发送至 {maskTarget(contactType, target)}
                </p>
                <div className="forgot-flow__field">
                  <span className="forgot-flow__label">验证码</span>
                  <input
                    className="forgot-flow__input"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="请输入验证码"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                  />
                </div>
                <button
                  type="button"
                  className="forgot-flow__resend"
                  disabled={countdown > 0 || sending}
                  onClick={() => void handleResend()}
                >
                  {countdown > 0 ? `${countdown}s` : "重新发送"}
                </button>
                <div className="forgot-flow__actions" style={{ marginTop: 20 }}>
                  <div className="forgot-flow__btn-row">
                    <button
                      type="button"
                      className="forgot-flow__btn forgot-flow__btn--primary"
                      onClick={handleVerifyNext}
                    >
                      下一步
                    </button>
                    <button
                      type="button"
                      className="forgot-flow__btn forgot-flow__btn--ghost"
                      onClick={() => {
                        setError(null);
                        setCountdown(0);
                        setStep("input");
                      }}
                    >
                      上一步
                    </button>
                  </div>
                </div>
              </>
            ) : null}

            {step === "reset" ? (
              <>
                <div className="forgot-flow__field">
                  <span className="forgot-flow__label">新密码</span>
                  <input
                    className="forgot-flow__input"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="请输入新密码"
                    autoComplete="new-password"
                  />
                </div>
                <div className="forgot-flow__field">
                  <span className="forgot-flow__label">确认新密码</span>
                  <input
                    className="forgot-flow__input"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="请再次输入新密码"
                    autoComplete="new-password"
                  />
                </div>
                <div className="forgot-flow__field">
                  <p className={`forgot-flow__rule-line ${checks.lengthOk ? "is-ok" : ""}`}>
                    {checks.lengthOk ? "✓" : "○"} 至少 8 位
                  </p>
                  <p className={`forgot-flow__rule-line ${checks.hasLetter ? "is-ok" : ""}`}>
                    {checks.hasLetter ? "✓" : "○"} 包含字母
                  </p>
                  <p className={`forgot-flow__rule-line ${checks.hasDigit ? "is-ok" : ""}`}>
                    {checks.hasDigit ? "✓" : "○"} 包含数字
                  </p>
                </div>
                <div className="forgot-flow__actions">
                  <div className="forgot-flow__btn-row">
                    <button
                      type="button"
                      className="forgot-flow__btn forgot-flow__btn--primary"
                      disabled={resetting}
                      onClick={() => void handleReset()}
                    >
                      {resetting ? "重置中..." : "重置密码"}
                    </button>
                    <button
                      type="button"
                      className="forgot-flow__btn forgot-flow__btn--ghost"
                      onClick={() => {
                        setError(null);
                        setStep("verify");
                      }}
                    >
                      上一步
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
