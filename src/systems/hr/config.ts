import {
  DEFAULT_BRAND_MARK_ICON_SRC,
  DEFAULT_BRAND_WORDMARK,
} from "@/config/brand";
import { DEFAULT_ICP_LINK_LABEL, DEFAULT_ICP_QUERY_URL } from "@/config/icp";
import type { LoginSystemConfig } from "@/types/login-system";

/**
 * HR 单系统配置（模板 C）。冻结映射：HR → 模板 C。
 *
 * TODO: 若产品定稿系统中文名与「HR 人力资源管理系统」不一致，同步调整 `systemName` 与 `meta.title`。
 */
export const hrLoginSystemConfig = {
  id: "hr",
  template: "C",
  systemName: "HR 人力资源管理系统",
  subtitle: "让组织、人事与用工协同更合规高效",
  hero: {
    /** 极轻秩序感底图：`public/assets/login/hr-ambient.webp`（与 BMS 氛围同族，可后续替换定稿素材） */
    imageSrc: "/assets/login/hr-ambient.webp",
    imageAlt:
      "简洁明亮的组织协同网络与浅色秩序底图，寓意人事连接与用工合规协同",
    abstractOnly: false,
    fetchPriority: "low",
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
    copyrightNotice: "© 2026 HR 云端云（北京）科技有限公司版权所有",
  },
  meta: {
    title: "HR 人力资源管理系统登录页",
  },
} satisfies LoginSystemConfig;
