import { LoginCard } from "@/components/cards/LoginCard";
import { VisualPanel } from "@/components/visual/VisualPanel";
import { useLoginExtensions } from "@/hooks/useLoginExtensions";
import type { TemplateLoginPageProps } from "@/types/login-system";
import "./TemplateBLoginPage.css";

/**
 * 模板 B：全幅平台感主氛围 + 居中浮层登录卡（冻结定义见 orchestrator）。
 * 复用 VisualPanel 的 cover 主图与叠层；登录区为独立 LoginCard，非营销 Hero 叙事。
 */
export function TemplateBLoginPage({ config }: TemplateLoginPageProps) {
  const ext = useLoginExtensions(config);
  return (
    <div className="template-b-root" data-login-system={config.id}>
      <div className="template-b__backdrop">
        <VisualPanel
          imageSrc={config.hero.imageSrc}
          imageAlt={config.hero.imageAlt}
          brand={config.brand}
          fetchPriority={config.hero.fetchPriority ?? "low"}
          priority={config.hero.priority ?? false}
        />
        <div className="template-b__readwash" aria-hidden />
      </div>

      <div className="template-b__stage">
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
