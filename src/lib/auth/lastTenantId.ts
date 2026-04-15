import { STORAGE_KEY_LAST_TENANT_ID } from "@/lib/auth/storageKeys";

export function readLastTenantId(): string | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY_LAST_TENANT_ID);
  return v && v.trim() ? v.trim() : null;
}

export function writeLastTenantId(tenantId: string): void {
  if (typeof window === "undefined") return;
  const t = tenantId.trim();
  if (!t) {
    window.localStorage.removeItem(STORAGE_KEY_LAST_TENANT_ID);
    return;
  }
  window.localStorage.setItem(STORAGE_KEY_LAST_TENANT_ID, t);
}
