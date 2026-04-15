import { useEffect } from "react";
import { DEFAULT_TAB_FAVICON_SRC } from "@/config/brand";
import type { LoginSystemConfig } from "@/types/login-system";

const ICON_SELECTOR = 'link[rel="icon"]';

function tabFaviconHref(config: LoginSystemConfig): string {
  return config.meta.favicon ?? DEFAULT_TAB_FAVICON_SRC;
}

/**
 * 按系统配置写入 `document.title` 与 `<link rel="icon">`，卸载时恢复进入页前的状态。
 */
export function useLoginDocumentMeta(config: LoginSystemConfig): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = config.meta.title;

    let link = document.querySelector<HTMLLinkElement>(ICON_SELECTOR);
    const created = !link;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    const previousHref = link.getAttribute("href");
    link.href = tabFaviconHref(config);

    return () => {
      document.title = previousTitle;
      if (created) {
        link.remove();
      } else if (previousHref !== null) {
        link.setAttribute("href", previousHref);
      } else {
        link.removeAttribute("href");
      }
    };
  }, [config]);
}
