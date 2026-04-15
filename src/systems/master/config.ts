import {
  DEFAULT_BRAND_MARK_ICON_SRC,
  DEFAULT_BRAND_WORDMARK,
} from "@/config/brand";
import { DEFAULT_ICP_LINK_LABEL, DEFAULT_ICP_QUERY_URL } from "@/config/icp";
import type { LoginSystemConfig } from "@/types/login-system";

/**
 * 统一业务平台（中枢入口）单系统配置（模板 B）。冻结映射：统一业务平台 → 模板 B。
 *
 * 主氛围图：`/assets/login/ubp-ambient.webp`。须为中枢门户独立成片（勿与 `crm-ambient.webp` 同源），覆盖同路径即可。
 * AI 生图提示词见 `public/assets/login/README.txt` 中「ubp-ambient」一节。
 */
export const masterLoginSystemConfig = {
  id: "master",
  template: "B",
  systemName: "统一业务平台",
  subtitle: "让多系统访问与业务协同更顺畅",
  hero: {
    imageSrc: "/assets/login/ubp-ambient.webp",
    imageAlt:
      "统一门户登录页全幅背景：近黑底上青蓝能量轨迹自两侧汇入中央椭圆形光环，中心暗区象征汇聚枢纽；无文字、无界面截图、无商标",
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
    copyrightNotice: "© 2026 统一业务平台 云端云（北京）科技有限公司版权所有",
  },
  meta: {
    title: "统一业务平台登录页",
  },
} satisfies LoginSystemConfig;
