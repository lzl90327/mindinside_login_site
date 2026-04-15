import type { LoginSystemConfig, TemplateLoginPageProps } from "@/types/login-system";
import { TemplateALoginPage } from "@/templates/template-a/TemplateALoginPage";
import { TemplateBLoginPage } from "@/templates/template-b/TemplateBLoginPage";
import { TemplateCLoginPage } from "@/templates/template-c/TemplateCLoginPage";

export function renderLoginTemplate(
  config: LoginSystemConfig,
  onSubmit: TemplateLoginPageProps["onSubmit"],
) {
  const props: TemplateLoginPageProps = { config, onSubmit };
  switch (config.template) {
    case "A":
      return <TemplateALoginPage {...props} />;
    case "B":
      return <TemplateBLoginPage {...props} />;
    case "C":
      return <TemplateCLoginPage {...props} />;
  }
}
