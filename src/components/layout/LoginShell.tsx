import type { ReactNode } from "react";
import { FooterMeta } from "@/components/footer/FooterMeta";
import type { ResolvedLegal } from "@/types/login-system";
import "./LoginShell.css";

export type LoginShellProps = {
  children: ReactNode;
  legal: ResolvedLegal;
};

/** 登录页顶层壳：主区撑满；备案版权为脱流浮字（非底栏承载） */
export function LoginShell({ children, legal }: LoginShellProps) {
  return (
    <div className="layout">
      <div className="layout__main">{children}</div>
      <FooterMeta {...legal} />
    </div>
  );
}
