import { Layout } from "@/components/Layout";
import { LoginCard } from "@/components/LoginCard";
import { VisualPanel } from "@/components/VisualPanel";

const defaultFields = [
  {
    id: "tenantId",
    label: "租户 ID",
    placeholder: "请输入租户 ID",
    type: "text",
  },
  {
    id: "username",
    label: "账号",
    placeholder: "请输入账号",
    type: "text",
  },
  {
    id: "password",
    label: "密码",
    placeholder: "请输入密码",
    type: "password",
  },
] as const;

export function LoginPageWMS() {
  return (
    <Layout>
      <VisualPanel
        imageSrc="/assets/login/wms-hero.webp"
        imageAlt="WMS 仓储作业主视觉"
        fetchPriority="high"
        priority
      />
      <div className="login-shell">
        <LoginCard
          systemName="WMS 仓储管理系统"
          subtitle="让库存、作业与履约协同更高效"
          fields={[...defaultFields]}
          onSubmit={async (values) => {
            console.info("login submit", values);
            await new Promise((r) => setTimeout(r, 400));
          }}
        />
      </div>
    </Layout>
  );
}
