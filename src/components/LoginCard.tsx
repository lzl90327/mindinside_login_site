import { useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import "./LoginCard.css";

export type LoginField = {
  id: string;
  label: string;
  placeholder: string;
  type: string;
};

export type LoginCardProps = {
  systemName: string;
  subtitle: string;
  fields: LoginField[];
  onSubmit: (values: Record<string, string>) => void | Promise<void>;
  slots?: {
    captcha?: ReactNode;
    footerLinks?: ReactNode;
    sso?: ReactNode;
  };
  rememberMe?: ReactNode;
  forgotPassword?: ReactNode;
  localeSwitcher?: ReactNode;
  envSwitcher?: ReactNode;
};

export function LoginCard({
  systemName,
  subtitle,
  fields,
  onSubmit,
  slots,
  rememberMe,
  forgotPassword,
  localeSwitcher,
  envSwitcher,
}: LoginCardProps) {
  const formId = useId();
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.id, ""])),
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const errorId = `${formId}-form-error`;

  const orderedFields = useMemo(() => [...fields], [fields]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const next: Record<string, string> = {};
    for (const f of orderedFields) {
      if (!values[f.id]?.trim()) {
        next[f.id] = `请填写${f.label}`;
      }
    }
    setFieldErrors(next);
    if (Object.keys(next).length) {
      setFormError("请检查表单中的错误项。");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch {
      setFormError("登录失败，请稍后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  const hasSecondaryRow = Boolean(rememberMe || forgotPassword);
  const hasMetaRow = Boolean(localeSwitcher || envSwitcher);

  return (
    <aside className="login-card-root" aria-labelledby={`${formId}-title`}>
      <div className="login-card">
        <div className="login-card__inner">
          <header className="login-card__head">
            <h1 id={`${formId}-title`} className="login-card__title">
              {systemName}
            </h1>
            <p className="login-card__subtitle">{subtitle}</p>
          </header>

          <form className="login-card__form" onSubmit={handleSubmit} noValidate>
            {formError ? (
              <div
                id={errorId}
                className="login-card__alert"
                role="alert"
                aria-live="polite"
              >
                {formError}
              </div>
            ) : null}

            <div className="login-card__fields">
              {orderedFields.map((f) => {
                const err = fieldErrors[f.id];
                const errId = `${formId}-err-${f.id}`;
                return (
                  <div key={f.id} className="login-card__field">
                    <label className="login-card__label" htmlFor={`${formId}-${f.id}`}>
                      {f.label}
                    </label>
                    <input
                      id={`${formId}-${f.id}`}
                      name={f.id}
                      type={f.type}
                      autoComplete={
                        f.id === "password"
                          ? "current-password"
                          : f.id === "username"
                            ? "username"
                            : "organization"
                      }
                      placeholder={f.placeholder}
                      className="login-card__input"
                      value={values[f.id] ?? ""}
                      disabled={submitting}
                      onChange={(ev) =>
                        setValues((prev) => ({ ...prev, [f.id]: ev.target.value }))
                      }
                      aria-invalid={err ? "true" : undefined}
                      aria-describedby={err ? errId : undefined}
                    />
                    {err ? (
                      <p id={errId} className="login-card__field-error" role="alert">
                        {err}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {slots?.captcha ? (
              <div className="login-card__slot login-card__slot--captcha">
                {slots.captcha}
              </div>
            ) : null}

            {hasSecondaryRow ? (
              <div className="login-card__row login-card__row--split">
                <div className="login-card__row-start">{rememberMe ?? null}</div>
                <div className="login-card__row-end">{forgotPassword ?? null}</div>
              </div>
            ) : null}

            <button
              type="submit"
              className="login-card__submit"
              disabled={submitting}
              aria-busy={submitting}
            >
              登录
            </button>

            {slots?.footerLinks ? (
              <div className="login-card__slot login-card__slot--links">
                {slots.footerLinks}
              </div>
            ) : null}

            {slots?.sso ? (
              <div className="login-card__slot login-card__slot--sso">{slots.sso}</div>
            ) : null}

            {hasMetaRow ? (
              <div className="login-card__row login-card__row--meta">
                {localeSwitcher ?? null}
                {envSwitcher ?? null}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </aside>
  );
}
