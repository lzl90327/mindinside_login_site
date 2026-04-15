import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { FORGOT_PASSWORD_PATHS, type LoginRouteSystemId } from "@/config/routes";
import {
  clearSavedCredentials,
  isSavedCredentialsExpired,
  readSavedCredentials,
  toLoginDefaults,
  writeSavedCredentials,
} from "@/lib/auth/savedCredentials";
import { readLastTenantId, writeLastTenantId } from "@/lib/auth/lastTenantId";
import { postLogin } from "@/lib/auth/loginApi";
import type { LoginSystemConfig } from "@/types/login-system";

function resolveExtensions(config: LoginSystemConfig) {
  return {
    rememberCredentials: config.extensions?.rememberCredentials !== false,
    forgotPassword: config.extensions?.forgotPassword !== false,
  };
}

function parseTenantId(raw: string): number {
  const n = Number(String(raw).trim());
  if (!Number.isFinite(n)) {
    throw new Error("租户 ID 无效");
  }
  return n;
}

export type LoginExtensionsUi = {
  defaultValues: Record<string, string>;
  rememberMe: ReactNode | undefined;
  forgotPassword: ReactNode | undefined;
  handleSubmit: (values: Record<string, string>) => Promise<void>;
};

export function useLoginExtensions(config: LoginSystemConfig): LoginExtensionsUi {
  const flags = useMemo(() => resolveExtensions(config), [config]);

  const initial = useMemo(() => {
    const defaults: Record<string, string> = {
      tenantId: "",
      username: "",
      password: "",
    };
    let rememberDefault = false;
    if (flags.rememberCredentials) {
      const saved = readSavedCredentials();
      if (saved && !isSavedCredentialsExpired(saved)) {
        Object.assign(defaults, toLoginDefaults(saved));
        rememberDefault = true;
      } else if (saved && isSavedCredentialsExpired(saved)) {
        clearSavedCredentials();
      }
    }
    if (!defaults.tenantId.trim()) {
      const last = readLastTenantId();
      if (last) {
        defaults.tenantId = last;
      }
    }
    return { defaults, rememberDefault };
  }, [flags.rememberCredentials]);

  const [rememberChecked, setRememberChecked] = useState(initial.rememberDefault);
  const rememberRef = useRef(rememberChecked);
  rememberRef.current = rememberChecked;

  const syncRemember = useCallback((next: boolean) => {
    rememberRef.current = next;
    setRememberChecked(next);
  }, []);

  const forgotPath =
    config.id in FORGOT_PASSWORD_PATHS
      ? FORGOT_PASSWORD_PATHS[config.id as LoginRouteSystemId]
      : FORGOT_PASSWORD_PATHS.wms;

  const rememberMe =
    flags.rememberCredentials ? (
      <div className="login-card__remember-wrap">
        <label className="login-card__remember-label" htmlFor={`remember-${config.id}`}>
          <input
            id={`remember-${config.id}`}
            type="checkbox"
            checked={rememberChecked}
            onChange={(e) => syncRemember(e.target.checked)}
          />
          <span>记住账号密码</span>
        </label>
        <span className="login-card__remember-hint">有效期30天</span>
      </div>
    ) : undefined;

  const forgotPassword = flags.forgotPassword ? (
    <Link className="login-card__forgot-link" to={forgotPath}>
      忘记密码？
    </Link>
  ) : undefined;

  const handleSubmit = useCallback(
    async (values: Record<string, string>) => {
      const tenantId = parseTenantId(values.tenantId ?? "");
      await postLogin({
        tenantId,
        username: values.username ?? "",
        password: values.password ?? "",
        rememberMe: rememberRef.current,
      });
      writeLastTenantId(String(values.tenantId ?? "").trim());
      if (rememberRef.current) {
        writeSavedCredentials({
          tenantId: String(values.tenantId ?? "").trim(),
          username: values.username ?? "",
          password: values.password ?? "",
        });
      } else {
        clearSavedCredentials();
      }
    },
    [],
  );

  return {
    defaultValues: initial.defaults,
    rememberMe,
    forgotPassword,
    handleSubmit,
  };
}
