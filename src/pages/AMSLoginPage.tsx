import { LoginShell } from "@/components/layout/LoginShell";
import { useLoginDocumentMeta } from "@/hooks/useLoginDocumentMeta";
import { assetLoginSystemConfig } from "@/systems/asset/config";
import { resolveLegal } from "@/systems/resolveLegal";
import { renderLoginTemplate } from "@/templates/renderLoginTemplate";

export function AMSLoginPage() {
  useLoginDocumentMeta(assetLoginSystemConfig);
  const legal = resolveLegal(assetLoginSystemConfig.legal);

  return (
    <LoginShell legal={legal}>
      {renderLoginTemplate(assetLoginSystemConfig)}
    </LoginShell>
  );
}
