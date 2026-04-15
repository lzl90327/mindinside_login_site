export type LoginTemplateId = "A" | "B" | "C";

export type LoginFieldConfig = {
  id: string;
  label: string;
  placeholder: string;
  type: string;
};

/** 法务展示：字段均可选，未填项在 resolveLegal 中与全局默认合并 */
export type LoginLegalConfig = {
  icpQueryUrl?: string;
  icpLinkLabel?: string;
  copyrightNotice?: string;
};

export type LoginHeroConfig = {
  imageSrc: string;
  imageAlt: string;
  fetchPriority?: "high" | "low" | "auto";
  priority?: boolean;
  /**
   * 为 true 时不渲染主视觉 `<img>`（模板 C 等以 CSS 抽象底为主），
   * `imageSrc` 仍必填作未来素材路径约定，避免无文件时的 broken image。
   */
  abstractOnly?: boolean;
};

export type LoginBrandMarkConfig = {
  markIconSrc: string;
  markWordmark: string;
};

/** 浏览器标签页元信息（document title / favicon），按系统配置 */
export type LoginTabMetaConfig = {
  title: string;
  /** 系统专属 favicon 路径；缺省时入口层回落到品牌默认标签页图标 */
  favicon?: string;
};

/** 登录扩展能力开关；缺省时按冻结 §6 视为全开 */
export type LoginExtensionsConfig = {
  /** E-1 记住账号密码 */
  rememberCredentials?: boolean;
  /** E-2 忘记密码 */
  forgotPassword?: boolean;
};

export type LoginSystemConfig = {
  id: string;
  template: LoginTemplateId;
  systemName: string;
  subtitle: string;
  hero: LoginHeroConfig;
  brand: LoginBrandMarkConfig;
  fields: LoginFieldConfig[];
  submitButtonLabel: string;
  legal: LoginLegalConfig;
  meta: LoginTabMetaConfig;
  extensions?: LoginExtensionsConfig;
};

export type ResolvedLegal = {
  icpQueryUrl: string;
  icpLinkLabel: string;
  copyrightNotice: string;
};

export type TemplateLoginPageProps = {
  config: LoginSystemConfig;
};
