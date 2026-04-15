import {
  DEFAULT_BRAND_MARK_ICON_SRC,
  DEFAULT_BRAND_WORDMARK,
} from "@/config/brand";
import { DEFAULT_ICP_LINK_LABEL, DEFAULT_ICP_QUERY_URL } from "@/config/icp";
import type { LoginSystemConfig } from "@/types/login-system";

/**
 * TMS 单系统配置（模板 A）。
 *
 * 主视觉：`/assets/login/tms-hero.webp`（运输场景）；若需替换更高分辨率成片，保持同路径覆盖即可。
 */
export const tmsLoginSystemConfig = {
  id: "tms",
  template: "A",
  systemName: "TMS 运输管理系统",
  subtitle: "让调度、在途与结算衔接更顺畅",
  hero: {
    imageSrc: "/assets/login/tms-hero.webp",
    imageAlt:
      "夜间高速路长曝光画面：雨湿路面映出红白车灯轨迹，货运重卡穿行其间，体现全天候运输与在途物流调度",
    fetchPriority: "high",
    priority: true,
  },
  brand: {
    markIconSrc: DEFAULT_BRAND_MARK_ICON_SRC,
    markWordmark: DEFAULT_BRAND_WORDMARK,
  },
  fields: [
    {
      id: "tenantId",
      label: "租户 ID",
      placeholder: "请输入租户 ID",
      type: "text",
    },
    {
      id: "username",
      label: "账号",
      placeholder: "请输入账号",
      type: "text",
    },
    {
      id: "password",
      label: "密码",
      placeholder: "请输入密码",
      type: "password",
    },
  ],
  submitButtonLabel: "登录",
  legal: {
    /** ICP 走公共默认，与 WMS 一致 */
    icpQueryUrl: DEFAULT_ICP_QUERY_URL,
    icpLinkLabel: DEFAULT_ICP_LINK_LABEL,
    copyrightNotice: "© 2026 TMS 云端云（北京）科技有限公司版权所有",
  },
  meta: {
    title: "TMS 运输管理系统登录页",
  },
} satisfies LoginSystemConfig;
