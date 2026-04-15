import {
  DEFAULT_BRAND_MARK_ICON_SRC,
  DEFAULT_BRAND_WORDMARK,
} from "@/config/brand";
import { DEFAULT_ICP_LINK_LABEL, DEFAULT_ICP_QUERY_URL } from "@/config/icp";
import type { LoginSystemConfig } from "@/types/login-system";

/**
 * CRM 单系统配置（模板 B）。冻结映射：CRM → 模板 B。
 *
 * 主氛围图：`/assets/login/crm-ambient.webp`。已由图片链落盘为 AI 抽象平台氛围（约 1920×1071 WebP）；若需更高像素定稿可同路径覆盖。
 */
export const crmLoginSystemConfig = {
  id: "crm",
  template: "B",
  systemName: "CRM 客户关系管理系统",
  subtitle: "让线索、商机与客户服务衔接更顺畅",
  hero: {
    imageSrc: "/assets/login/crm-ambient.webp",
    imageAlt:
      "CRM 登录页全幅背景：冷灰与深蓝灰抽象渐变，极轻连接感线条与留白，无文字无界面拼贴",
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
    copyrightNotice: "© 2026 CRM 云端云（北京）科技有限公司版权所有",
  },
  meta: {
    title: "CRM 客户关系管理系统登录页",
  },
} satisfies LoginSystemConfig;
