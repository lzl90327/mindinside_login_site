/** 与旧端对齐：验证码长度仅用于前端 verify 步通过条件（冻结 §5.5）。 */
export const VERIFICATION_CODE_LENGTH = 6;

/** 记住凭证本地保存有效期（天），冻结 §4.1 */
export const SAVED_CREDENTIALS_TTL_DAYS = 30;

/** 发码同标识冷却（秒），冻结 §5.4 */
export const SEND_CODE_COOLDOWN_SEC = 60;
