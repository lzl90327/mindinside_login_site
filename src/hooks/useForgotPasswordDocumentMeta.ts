import { useEffect } from "react";
import type { LoginSystemConfig } from "@/types/login-system";

/** 与签认表备注一致：浏览器标签页 `忘记密码 - {系统名}` */
export function useForgotPasswordDocumentMeta(config: LoginSystemConfig): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `忘记密码 - ${config.systemName}`;
    return () => {
      document.title = previousTitle;
    };
  }, [config]);
}
