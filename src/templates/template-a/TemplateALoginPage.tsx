import { LoginCard } from "@/components/cards/LoginCard";
import { VisualPanel } from "@/components/visual/VisualPanel";
import type { TemplateLoginPageProps } from "@/types/login-system";
import "./TemplateALoginPage.css";

/**
 * 模板 A：左侧主视觉 + 右侧登录区；系统差异由 LoginSystemConfig 注入。
 */
export function TemplateALoginPage({ config, onSubmit }: TemplateLoginPageProps) {
  return (
    <div
      className="template-a-root"
      data-login-system={config.id}
      style={{ display: "contents" }}
    >
      <VisualPanel
        imageSrc={config.hero.imageSrc}
        imageAlt={config.hero.imageAlt}
        brand={config.brand}
        fetchPriority={config.hero.fetchPriority}
        priority={config.hero.priority}
      />
      <div className="login-shell">
        <LoginCard
          systemName={config.systemName}
          subtitle={config.subtitle}
          fields={config.fields}
          submitButtonLabel={config.submitButtonLabel}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
