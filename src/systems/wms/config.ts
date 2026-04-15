import {
  DEFAULT_BRAND_MARK_ICON_SRC,
  DEFAULT_BRAND_WORDMARK,
} from "@/config/brand";
import { DEFAULT_ICP_LINK_LABEL, DEFAULT_ICP_QUERY_URL } from "@/config/icp";
import type { LoginSystemConfig } from "@/types/login-system";

export const wmsLoginSystemConfig = {
  id: "wms",
  template: "A",
  systemName: "WMS 仓储管理系统",
  subtitle: "让库存、作业与履约协同更高效",
  hero: {
    imageSrc: "/assets/login/wms-hero.webp",
    imageAlt: "WMS 仓储作业主视觉",
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
    icpQueryUrl: DEFAULT_ICP_QUERY_URL,
    icpLinkLabel: DEFAULT_ICP_LINK_LABEL,
    copyrightNotice: "© 2026 WMS 云端云（北京）科技有限公司版权所有",
  },
  meta: {
    title: "WMS 仓储管理系统登录页",
    /** 专属 favicon 到位后在此填写路径；缺省由入口层使用品牌默认图标 */
  },
} satisfies LoginSystemConfig;
