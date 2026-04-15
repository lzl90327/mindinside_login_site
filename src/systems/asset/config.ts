import {
  DEFAULT_BRAND_MARK_ICON_SRC,
  DEFAULT_BRAND_WORDMARK,
} from "@/config/brand";
import { DEFAULT_ICP_LINK_LABEL, DEFAULT_ICP_QUERY_URL } from "@/config/icp";
import type { LoginSystemConfig } from "@/types/login-system";

/**
 * AMS 单系统配置（模板 C）。冻结映射：资产管理 → 模板 C。
 *
 * 氛围：`ams-ambient.webp`（图片链落盘，约 1920×1071 WebP）+ `[data-login-system="asset"]` 叠层，
 * 与 BMS/HR 冷蓝弱图、CRM 模板 B 暗底区分。
 */
export const assetSystemId = "asset" as const;

export const assetLoginSystemConfig = {
  id: assetSystemId,
  template: "C",
  systemName: "AMS 资产管理系统",
  subtitle: "让台账、调拨与资产生命周期协同更可控",
  hero: {
    /** 主氛围图：`public/assets/login/ams-ambient.webp`（AI 出图后经 Pillow 缩放转 WebP） */
    imageSrc: "/assets/login/ams-ambient.webp",
    imageAlt:
      "青灰暖石向抽象秩序底图，轻渐变与柔光，不承载具体业务叙事",
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
    copyrightNotice:
      "© 2026 AMS 资产管理系统 云端云（北京）科技有限公司版权所有",
  },
  meta: {
    title: "AMS 资产管理系统登录页",
  },
} satisfies LoginSystemConfig;
