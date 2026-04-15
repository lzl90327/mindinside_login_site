import { BrandMark } from "@/components/brand/BrandMark";
import { LoginCard } from "@/components/cards/LoginCard";
import { useLoginExtensions } from "@/hooks/useLoginExtensions";
import type { TemplateLoginPageProps } from "@/types/login-system";
import "./TemplateCLoginPage.css";

/**
 * 模板 C：单卡绝对主焦点 + 轻量抽象秩序底（冻结定义见 orchestrator）。
 * 供 BMS、HR、资产等 C 系复用；不做模板 A 式强主视觉叙事分栏。
 */
export function TemplateCLoginPage({ config }: TemplateLoginPageProps) {
  const ext = useLoginExtensions(config);
  const showHeroImage = !config.hero.abstractOnly;

  return (
    <div className="template-c-root" data-login-system={config.id}>
      {showHeroImage ? (
        <img
          className="template-c__ambient-img"
          src={config.hero.imageSrc}
          alt={config.hero.imageAlt}
          decoding="async"
          fetchPriority={config.hero.fetchPriority ?? "low"}
          loading={config.hero.priority ? "eager" : "lazy"}
        />
      ) : null}
      <div className="template-c__wash" aria-hidden />
      <div className="template-c__noise" aria-hidden />
      <div className="template-c__geometry" aria-hidden />

      <div className="template-c__stage">
        <div className="template-c__brand">
          <BrandMark
            iconSrc={config.brand.markIconSrc}
            wordmark={config.brand.markWordmark}
          />
        </div>
        <LoginCard
          systemName={config.systemName}
          subtitle={config.subtitle}
          fields={config.fields}
          defaultValues={ext.defaultValues}
          submitButtonLabel={config.submitButtonLabel}
          onSubmit={ext.handleSubmit}
          rememberMe={ext.rememberMe}
          forgotPassword={ext.forgotPassword}
        />
      </div>
    </div>
  );
}
