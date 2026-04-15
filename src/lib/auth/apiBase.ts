/**
 * API 根路径；未配置时使用相对路径（由网关/同源反代承接 `/v1`）。
 * 与 Vite 约定：`import.meta.env.VITE_API_BASE_URL` 无尾部斜杠。
 */
export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL ?? "";
  return raw.replace(/\/+$/, "");
}
