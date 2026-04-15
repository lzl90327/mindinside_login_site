/**
 * 冻结 §5.4：8–32 位、须含字母与数字；弱密码拒绝由后端最终裁定，前端先做同款规则提示。
 */
const WEAK_LIST = [
  "12345678",
  "87654321",
  "password",
  "password123",
  "admin123",
  "qwerty123",
];

export function passwordMeetsPolicy(pw: string): boolean {
  if (pw.length < 8 || pw.length > 32) return false;
  if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) return false;
  const lower = pw.toLowerCase();
  if (WEAK_LIST.some((w) => lower.includes(w))) return false;
  return true;
}

export type PasswordRuleChecks = {
  lengthOk: boolean;
  hasLetter: boolean;
  hasDigit: boolean;
};

export function getPasswordRuleChecks(pw: string): PasswordRuleChecks {
  return {
    lengthOk: pw.length >= 8 && pw.length <= 32,
    hasLetter: /[A-Za-z]/.test(pw),
    hasDigit: /\d/.test(pw),
  };
}
