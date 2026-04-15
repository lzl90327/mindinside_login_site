import { LoginShell } from "@/components/layout/LoginShell";
import { useLoginDocumentMeta } from "@/hooks/useLoginDocumentMeta";
import { resolveLegal } from "@/systems/resolveLegal";
import { tmsLoginSystemConfig } from "@/systems/tms/config";
import { renderLoginTemplate } from "@/templates/renderLoginTemplate";

export function TMSLoginPage() {
  useLoginDocumentMeta(tmsLoginSystemConfig);
  const legal = resolveLegal(tmsLoginSystemConfig.legal);

  return (
    <LoginShell legal={legal}>
      {renderLoginTemplate(tmsLoginSystemConfig)}
    </LoginShell>
  );
}
