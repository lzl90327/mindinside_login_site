import {
  DEFAULT_BRAND_MARK_ICON_SRC,
  DEFAULT_BRAND_WORDMARK,
} from "@/config/brand";
import { DEFAULT_ICP_LINK_LABEL, DEFAULT_ICP_QUERY_URL } from "@/config/icp";
import type { LoginSystemConfig } from "@/types/login-system";

/**
 * BMS 单系统配置（模板 C）。冻结映射：BMS → 模板 C。
 *
 * 系统中文名若需与商务定稿不一致，改 `systemName` / `meta.title` 即可。
 */
export const bmsLoginSystemConfig = {
  id: "bms",
  template: "C",
  // TODO: 若产品定稿更名，同步调整 systemName 与 meta.title
  systemName: "BMS 业务管理系统",
  subtitle: "让费用、合同与结算协同更可控",
  hero: {
    /** 极轻秩序感底图：`public/assets/login/bms-ambient.webp` */
    imageSrc: "/assets/login/bms-ambient.webp",
    imageAlt:
      "极轻冷灰蓝渐变与柔光叠层，作为登录页背景氛围，不承载业务叙事信息",
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
    copyrightNotice: "© 2026 BMS 云端云（北京）科技有限公司版权所有",
  },
  meta: {
    title: "BMS 业务管理系统登录页",
  },
} satisfies LoginSystemConfig;
