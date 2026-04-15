import { Navigate, useParams } from "react-router-dom";
import { ForgotPasswordFlow } from "@/components/forgot/ForgotPasswordFlow";
import { LoginShell } from "@/components/layout/LoginShell";
import { LOGIN_PATHS } from "@/config/routes";
import { useForgotPasswordDocumentMeta } from "@/hooks/useForgotPasswordDocumentMeta";
import { getLoginSystemConfig, isLoginRouteSystemId } from "@/systems/registry";
import { resolveLegal } from "@/systems/resolveLegal";

export function ForgotPasswordPage() {
  const { systemId } = useParams();
  if (!systemId || !isLoginRouteSystemId(systemId)) {
    return <Navigate to={LOGIN_PATHS.wms} replace />;
  }
  const config = getLoginSystemConfig(systemId);
  if (config.extensions?.forgotPassword === false) {
    return <Navigate to={LOGIN_PATHS[systemId]} replace />;
  }
  useForgotPasswordDocumentMeta(config);
  const legal = resolveLegal(config.legal);
  return (
    <LoginShell legal={legal}>
      <ForgotPasswordFlow config={config} copyrightNotice={legal.copyrightNotice} />
    </LoginShell>
  );
}
