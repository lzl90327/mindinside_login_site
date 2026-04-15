import { useState } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import type { LoginBrandMarkConfig } from "@/types/login-system";
import "./VisualPanel.css";

export type VisualPanelProps = {
  imageSrc: string;
  imageAlt: string;
  brand: LoginBrandMarkConfig;
  /** LCP 场景可设 high */
  fetchPriority?: "high" | "low" | "auto";
  /** 是否 eager 加载首屏图 */
  priority?: boolean;
};

export function VisualPanel({
  imageSrc,
  imageAlt,
  brand,
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
      <BrandMark iconSrc={brand.markIconSrc} wordmark={brand.markWordmark} />
    </div>
  );
}
