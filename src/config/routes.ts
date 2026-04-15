/**
 * 登录路由与系统 id 扩展点（WMS、TMS 已挂载；其余系统路径预登记）。
 */
export type LoginRouteSystemId =
  | "wms"
  | "tms"
  | "crm"
  | "hr"
  | "bms"
  | "asset"
  | "master";

export const LOGIN_PATHS = {
  /** 当前 WMS 入口 */
  wms: "/login/wms",
  /** TMS（模板 A） */
  tms: "/login/tms",
  /** CRM（模板 B） */
  crm: "/login/crm",
  /** BMS（模板 C） */
  bms: "/login/bms",
  /** HR（模板 C） */
  hr: "/login/hr",
  /** AMS / 资产管理（模板 C） */
  asset: "/login/ams",
  /** 统一业务平台（中枢入口，模板 B） */
  master: "/login/master",
} as const;

/** 预留：多系统拆分路由时在此登记，避免散落魔法字符串 */
export const LOGIN_PATHS_PLANNED: Partial<Record<LoginRouteSystemId, string>> = {
  wms: LOGIN_PATHS.wms,
  tms: LOGIN_PATHS.tms,
  crm: LOGIN_PATHS.crm,
  hr: LOGIN_PATHS.hr,
  bms: LOGIN_PATHS.bms,
  asset: LOGIN_PATHS.asset,
  master: LOGIN_PATHS.master,
};

/** 忘记密码流程入口（与登录同源系统 id 对齐，便于返回登录） */
export const FORGOT_PASSWORD_PATHS: Record<LoginRouteSystemId, string> = {
  wms: "/forgot-password/wms",
  tms: "/forgot-password/tms",
  crm: "/forgot-password/crm",
  hr: "/forgot-password/hr",
  bms: "/forgot-password/bms",
  asset: "/forgot-password/asset",
  master: "/forgot-password/master",
};
