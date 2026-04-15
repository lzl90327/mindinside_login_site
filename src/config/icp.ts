/**
 * 全局备案默认值（可被各系统 `systems/<id>/config` 覆盖）。
 * ICP 查询地址上线前请替换为与备案号一致的管局公示/查询入口。
 */
export const DEFAULT_ICP_QUERY_URL = "https://beian.miit.gov.cn/";

export const DEFAULT_ICP_NUMBER = "京ICP备2026016691号-1";

/** 链接可见文案（与备案号一致） */
export const DEFAULT_ICP_LINK_LABEL = DEFAULT_ICP_NUMBER;
