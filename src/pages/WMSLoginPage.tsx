import { LoginShell } from "@/components/layout/LoginShell";
import { useLoginDocumentMeta } from "@/hooks/useLoginDocumentMeta";
import { resolveLegal } from "@/systems/resolveLegal";
import { wmsLoginSystemConfig } from "@/systems/wms/config";
import { renderLoginTemplate } from "@/templates/renderLoginTemplate";

export function WMSLoginPage() {
  useLoginDocumentMeta(wmsLoginSystemConfig);
  const legal = resolveLegal(wmsLoginSystemConfig.legal);

  return (
    <LoginShell legal={legal}>
      {renderLoginTemplate(wmsLoginSystemConfig, async (values) => {
        console.info("login submit", values);
        await new Promise((r) => setTimeout(r, 400));
      })}
    </LoginShell>
  );
}
