import { LoginShell } from "@/components/layout/LoginShell";
import { useLoginDocumentMeta } from "@/hooks/useLoginDocumentMeta";
import { hrLoginSystemConfig } from "@/systems/hr/config";
import { resolveLegal } from "@/systems/resolveLegal";
import { renderLoginTemplate } from "@/templates/renderLoginTemplate";

export function HRLoginPage() {
  useLoginDocumentMeta(hrLoginSystemConfig);
  const legal = resolveLegal(hrLoginSystemConfig.legal);

  return (
    <LoginShell legal={legal}>
      {renderLoginTemplate(hrLoginSystemConfig, async (values) => {
        console.info("login submit", values);
        await new Promise((r) => setTimeout(r, 400));
      })}
    </LoginShell>
  );
}
