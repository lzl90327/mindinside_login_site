import { LoginShell } from "@/components/layout/LoginShell";
import { useLoginDocumentMeta } from "@/hooks/useLoginDocumentMeta";
import { resolveLegal } from "@/systems/resolveLegal";
import { crmLoginSystemConfig } from "@/systems/crm/config";
import { renderLoginTemplate } from "@/templates/renderLoginTemplate";

export function CRMLoginPage() {
  useLoginDocumentMeta(crmLoginSystemConfig);
  const legal = resolveLegal(crmLoginSystemConfig.legal);

  return (
    <LoginShell legal={legal}>
      {renderLoginTemplate(crmLoginSystemConfig)}
    </LoginShell>
  );
}
