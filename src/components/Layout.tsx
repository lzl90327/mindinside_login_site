import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import "./Layout.css";

type LayoutProps = {
  children: ReactNode;
};

/** 模板 A 顶层：主区撑满；备案版权为脱流浮字（非底栏承载） */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <div className="layout__main">{children}</div>
      <SiteFooter />
    </div>
  );
}
