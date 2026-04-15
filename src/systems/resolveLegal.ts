import { DEFAULT_ICP_LINK_LABEL, DEFAULT_ICP_QUERY_URL } from "@/config/icp";
import type { LoginLegalConfig, ResolvedLegal } from "@/types/login-system";

export function resolveLegal(legal: LoginLegalConfig): ResolvedLegal {
  return {
    icpQueryUrl: legal.icpQueryUrl ?? DEFAULT_ICP_QUERY_URL,
    icpLinkLabel: legal.icpLinkLabel ?? DEFAULT_ICP_LINK_LABEL,
    copyrightNotice: legal.copyrightNotice ?? "",
  };
}
