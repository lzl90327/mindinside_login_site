import { useState } from "react";
import "./VisualPanel.css";

export type VisualPanelProps = {
  /** 默认 /assets/login/wms-hero.webp */
  imageSrc?: string;
  imageAlt?: string;
  /** LCP 场景可设 high */
  fetchPriority?: "high" | "low" | "auto";
  /** 是否 eager 加载首屏图 */
  priority?: boolean;
};

export function VisualPanel({
  imageSrc = "/assets/login/wms-hero.webp",
  imageAlt = "WMS 仓储作业主视觉",
  fetchPriority = "high",
  priority = true,
}: VisualPanelProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="visual-panel" data-fallback={imgFailed || undefined}>
      {!imgFailed && (
        <img
          className="visual-panel__img"
          src={imageSrc}
          alt={imageAlt}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={fetchPriority}
          onError={() => setImgFailed(true)}
        />
      )}
      <div className="visual-panel__wash" aria-hidden />
      <div className="visual-panel__bridge" aria-hidden />
      <div className="visual-panel__brand">
        <img
          className="visual-panel__brand-icon"
          src="/assets/brand/mindinside-logo-small.png"
          alt=""
          decoding="async"
          aria-hidden
        />
        <span className="visual-panel__brand-wordmark">MindInside</span>
      </div>
    </div>
  );
}
