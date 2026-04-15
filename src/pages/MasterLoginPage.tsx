import { LoginShell } from "@/components/layout/LoginShell";
import { useLoginDocumentMeta } from "@/hooks/useLoginDocumentMeta";
import { masterLoginSystemConfig } from "@/systems/master/config";
import { resolveLegal } from "@/systems/resolveLegal";
import { renderLoginTemplate } from "@/templates/renderLoginTemplate";

export function MasterLoginPage() {
  useLoginDocumentMeta(masterLoginSystemConfig);
  const legal = resolveLegal(masterLoginSystemConfig.legal);

  return (
    <LoginShell legal={legal}>
      {renderLoginTemplate(masterLoginSystemConfig, async (values) => {
        console.info("login submit", values);
        await new Promise((r) => setTimeout(r, 400));
      })}
    </LoginShell>
  );
}
