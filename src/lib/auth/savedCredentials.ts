import { SAVED_CREDENTIALS_TTL_DAYS } from "@/lib/auth/constants";
import { deobfuscatePassword, obfuscatePassword } from "@/lib/auth/obfuscate";
import { STORAGE_KEY_SAVED_CREDENTIALS } from "@/lib/auth/storageKeys";

export type SavedCredentialsStored = {
  tenantId: number | string;
  username: string;
  /** 混淆后的密码 */
  password: string;
  /** 写入时间戳（ms）；缺省时视为旧数据，仍尝试反混淆使用，但不保证 TTL */
  savedAt?: number;
};

function parseStored(raw: string | null): SavedCredentialsStored | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as SavedCredentialsStored;
    if (
      v &&
      typeof v === "object" &&
      "tenantId" in v &&
      "username" in v &&
      "password" in v &&
      typeof v.password === "string" &&
      typeof v.username === "string"
    ) {
      return v;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function readSavedCredentials(): SavedCredentialsStored | null {
  if (typeof window === "undefined") return null;
  return parseStored(window.localStorage.getItem(STORAGE_KEY_SAVED_CREDENTIALS));
}

export function isSavedCredentialsExpired(entry: SavedCredentialsStored): boolean {
  if (entry.savedAt == null) return false;
  const maxMs = SAVED_CREDENTIALS_TTL_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - entry.savedAt > maxMs;
}

export function clearSavedCredentials(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY_SAVED_CREDENTIALS);
}

export function writeSavedCredentials(payload: {
  tenantId: string;
  username: string;
  password: string;
}): void {
  if (typeof window === "undefined") return;
  const stored: SavedCredentialsStored = {
    tenantId: /^\d+$/.test(payload.tenantId.trim())
      ? Number(payload.tenantId.trim())
      : payload.tenantId.trim(),
    username: payload.username,
    password: obfuscatePassword(payload.password),
    savedAt: Date.now(),
  };
  window.localStorage.setItem(STORAGE_KEY_SAVED_CREDENTIALS, JSON.stringify(stored));
}

export function toLoginDefaults(entry: SavedCredentialsStored): Record<string, string> {
  const tid =
    typeof entry.tenantId === "number" ? String(entry.tenantId) : String(entry.tenantId);
  let passwordPlain = "";
  try {
    passwordPlain = deobfuscatePassword(entry.password);
  } catch {
    passwordPlain = "";
  }
  return {
    tenantId: tid,
    username: entry.username,
    password: passwordPlain,
  };
}
