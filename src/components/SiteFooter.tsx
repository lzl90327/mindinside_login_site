import {
  SITE_COPYRIGHT_NOTICE,
  SITE_ICP_LINK_LABEL,
  SITE_ICP_QUERY_URL,
} from "@/config/siteLegal";
import "./SiteFooter.css";

/** 备案与版权：脱流浮字，非文档流 footer 承载条 */
export function SiteFooter() {
  return (
    <div className="legal-float" role="contentinfo" aria-label="备案与版权信息">
      <div className="legal-float__rail">
        <div className="legal-float__cluster">
          <a
            className="legal-float__icp"
            href={SITE_ICP_QUERY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE_ICP_LINK_LABEL}
          </a>
          <span className="legal-float__copyright">{SITE_COPYRIGHT_NOTICE}</span>
        </div>
      </div>
    </div>
  );
}
