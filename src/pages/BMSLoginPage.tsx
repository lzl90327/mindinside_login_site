import { LoginShell } from "@/components/layout/LoginShell";
import { useLoginDocumentMeta } from "@/hooks/useLoginDocumentMeta";
import { bmsLoginSystemConfig } from "@/systems/bms/config";
import { resolveLegal } from "@/systems/resolveLegal";
import { renderLoginTemplate } from "@/templates/renderLoginTemplate";

export function BMSLoginPage() {
  useLoginDocumentMeta(bmsLoginSystemConfig);
  const legal = resolveLegal(bmsLoginSystemConfig.legal);

  return (
    <LoginShell legal={legal}>
      {renderLoginTemplate(bmsLoginSystemConfig)}
    </LoginShell>
  );
}
