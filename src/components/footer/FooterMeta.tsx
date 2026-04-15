import type { ResolvedLegal } from "@/types/login-system";
import "./FooterMeta.css";

export type FooterMetaProps = ResolvedLegal;

/** 备案与版权：脱流浮字，非文档流 footer 承载条 */
export function FooterMeta({ icpQueryUrl, icpLinkLabel, copyrightNotice }: FooterMetaProps) {
  return (
    <div className="legal-float" role="contentinfo" aria-label="备案与版权信息">
      <div className="legal-float__rail">
        <div className="legal-float__cluster">
          <a
            className="legal-float__icp"
            href={icpQueryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {icpLinkLabel}
          </a>
          <span className="legal-float__copyright">{copyrightNotice}</span>
        </div>
      </div>
    </div>
  );
}
