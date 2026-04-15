# 多系统统一登录页（React + Vite）

本仓库在本地工作区目录名为 `mindinside_login_page`；`package.json` 中的 npm 包名为 `wms_login_page`（`private`）。下文以**仓库内可验证的实现与文档**为准。

## 项目简介

基于 **React 18**、**TypeScript**、**Vite 5** 与 **React Router v6** 的前端单页应用，为同一产品族下的多个业务系统提供**统一维护的登录页与忘记密码流程**。各系统通过**独立路由入口**与**独立系统配置**派生页面，共享布局、认证调用、扩展能力（记住账号密码、忘记密码）与三套视觉模板（A / B / C）。

## 当前目标与定位

- **目标**：在多系统场景下复用同一套前端工程与规范，降低各系统登录/找回密码体验的割裂与重复实现成本。
- **定位**：偏 **B 端 Web 管理端** 登录与扩展流程的前端实现；与后端的契约以仓库内 API 封装及 `docs/specs` 中冻结口径为准（见下文「登录扩展能力」）。

## 核心特性（已实现、可验证）

- **多路由入口**：每个系统对应独立 `login` 与 `forgot-password` 路径（见「多系统支持」）。
- **模板体系**：`LoginSystemConfig.template` 为 `"A" | "B" | "C"`，由 `renderLoginTemplate` 分发到 `TemplateA` / `TemplateB` / `TemplateC` 组件。
- **分层结构**：
  - **薄页面入口**（`src/pages/*LoginPage.tsx`）：挂载文档元信息、`LoginShell`、法务解析与 `renderLoginTemplate(config)`。
  - **系统配置层**（`src/systems/<system>/config.ts`）：系统名、副标题、字段、主视觉、品牌区、法务、`meta`、可选 `extensions`。
  - **注册表**（`src/systems/registry.ts`）：按 `LoginRouteSystemId` 解析配置。
  - **共享层**：`src/components/`（布局、登录卡片、忘记密码流程等）、`src/lib/auth/`（登录/忘记密码 API、本地凭证与租户预填等）、`src/hooks/`、`src/config/`。
- **登录请求**：`POST {API_BASE}/v1/auth/login`，请求体含 `tenantId`、`username`、`password`、`rememberMe`（实现见 `src/lib/auth/loginApi.ts`）。
- **API 基址**：通过环境变量 `VITE_API_BASE_URL` 配置（无则走相对路径，由网关或同源反代承接 `/v1`），见 `src/lib/auth/apiBase.ts`。
- **静态资源**：登录主视觉 / 氛围图置于 `public/assets/login/`，约定见同目录 `README.txt`。

## 多系统支持情况

路由在 `src/main.tsx` 中注册；路径常量在 `src/config/routes.ts` 的 `LOGIN_PATHS` / `FORGOT_PASSWORD_PATHS` 中集中维护。

| 系统 | 路由 `systemId` | 登录路径 | 忘记密码路径 | 模板（配置事实） |
|------|-----------------|----------|----------------|------------------|
| WMS | `wms` | `/login/wms` | `/forgot-password/wms` | A |
| TMS | `tms` | `/login/tms` | `/forgot-password/tms` | A |
| CRM | `crm` | `/login/crm` | `/forgot-password/crm` | B |
| BMS | `bms` | `/login/bms` | `/forgot-password/bms` | C |
| HR | `hr` | `/login/hr` | `/forgot-password/hr` | C |
| AMS（配置 id 为 `asset`） | `asset` | `/login/ams` | `/forgot-password/asset` | C |
| 统一业务平台 | `master` | `/login/master` | `/forgot-password/master` | B |

根路径 `/` 重定向至 `/login/wms`。忘记密码统一为 `/forgot-password/:systemId`，非法 `systemId` 时回退到 WMS 登录（见 `ForgotPasswordPage`）。

> **说明**：`routes.ts` 文件头注释仍写有「WMS、TMS 已挂载；其余系统路径预登记」，与当前 `main.tsx` 已为上述全部系统挂载路由的实现不一致；以路由注册代码为准。

## 技术栈

| 类别 | 选型 |
|------|------|
| 运行时 | React 18 |
| 语言 | TypeScript（~5.6） |
| 构建 | Vite 5 |
| 路由 | react-router-dom 6 |
| 包管理 | npm（存在 `package-lock.json`） |

**待补充**：`package.json` 未声明 `engines`；仓库根目录无 `.nvmrc`。建议在团队内约定 Node 与 npm 主版本并在文档或锁文件中固化。

## 项目结构（摘要）

```
src/
  components/     # 布局、登录卡片、品牌、页脚、主视觉、忘记密码流程等
  config/         # 路由常量、品牌与 ICP 等全局默认
  hooks/          # 文档 meta、登录扩展 UI 逻辑、忘记密码 meta
  lib/auth/       # API 基址、登录/忘记密码请求、凭证存储、密码策略等
  pages/          # 各系统薄入口 + ForgotPasswordPage
  systems/        # 各系统 config、registry、法务合并 resolveLegal
  templates/      # 模板 A/B/C 与 renderLoginTemplate
  types/          # LoginSystemConfig 等类型定义
public/
  assets/login/   # WebP 等素材与 README.txt 约定
docs/
  specs/          # 登录扩展能力冻结口径（草案）
  review/         # 忘记密码等文案签认表（模板）
```

## 本地开发

1. 安装依赖：`npm install`
2. 启动开发服务器：`npm run dev`  
   - Vite 开发服务器默认 **端口 `5656`**，且 `strictPort: true`（见 `vite.config.ts`）。
3. 按需设置 API 基址（可选）：  
   - 例如 `.env.local` 中配置 `VITE_API_BASE_URL=https://your-api-origin`（无尾部斜杠）。

## 构建与预览

- 生产构建：`npm run build`（`tsc -b` 类型检查 + `vite build`）
- 本地预览构建产物：`npm run preview`（同样使用端口 `5656`）

**待补充**：生产环境部署方式、CDN/网关路径、环境变量注入清单（仓库内无独立部署文档）。

## 设计与规范文档

| 文档 | 路径 | 说明 |
|------|------|------|
| 登录扩展能力口径冻结（草案） | `docs/specs/login-extension-freeze.md` | 记住账号密码（E-1）、忘记密码/重置（E-2）与旧系统对齐的原则、接口与默认开关矩阵；**文内状态为待产品、架构联合签认后生效**。 |
| 登录与忘记密码文案签认表 | `docs/review/forgot-flow-copy-signoff.md` | 可见文案逐字对照用表；签认栏待填写。 |
| 登录页静态资源约定 | `public/assets/login/README.txt` | 各系统主视觉/氛围图文件名与替换说明。 |

## 登录扩展能力

### 记住账号密码

- 实现入口：`src/hooks/useLoginExtensions.tsx`，配合 `src/lib/auth/savedCredentials.ts`、`lastTenantId.ts`、`obfuscate.ts` 等。
- UI 文案与行为（如「记住账号密码」「有效期30天」、`rememberMe` 传参）与冻结文档 **§4** 对齐方向一致；**完整验收口径以 `docs/specs/login-extension-freeze.md` 为准**。
- 各系统配置未显式关闭 `extensions.rememberCredentials` 时，类型与实现上默认视为开启（`!== false`，见 `useLoginExtensions` 内 `resolveExtensions`）。

### 忘记密码

- 路由：`/forgot-password/:systemId`；流程组件：`src/components/forgot/ForgotPasswordFlow.tsx`；API：`src/lib/auth/forgotPasswordApi.ts`。
- 四阶段、接口路径等以冻结文档 **§5** 为书面依据；**签认生效前**实现与文档并行演进时，以代码与签认表共同为准。
- `extensions.forgotPassword === false` 时，`ForgotPasswordPage` 会重定向回对应系统登录页。

## 当前状态与进度

- **多系统登录路由与配置**：已在代码中挂载 WMS / TMS / CRM / BMS / HR / AMS（`asset`）/ 统一业务平台（`master`），并与模板 A/B/C 绑定。
- **登录扩展**：记住账号密码与忘记密码相关模块已存在于仓库；**与旧系统完全对齐的冻结文档仍为 v1.0 草案，待双签认**（见 `login-extension-freeze.md` 文首与 §8）。
- **文案**：`forgot-flow-copy-signoff.md` 为签认模板，**「最终采用文案」等列多为空**，属待协作填写状态。
- **工程化**：仓库内**未发现** `.github/workflows` 等 CI 配置；**待补充**自动化测试与流水线说明（若后续添加可再更新 README）。

## 后续计划（仅列仓库内已有依据者）

- 冻结文档 **§8**：产品 + 架构签认后，冻结口径生效；Figma 用于布局与品牌语言但不得改变已冻结步骤与契约。
- 冻结文档 **§8.4 / §5.7**：多系统同域下存储键命名空间、流程优化等若要做，需**单独立项**并修订冻结文档版本。
- 签认表：完成「最终采用文案」与签认区填写后，作为实现与验收的文字依据。

## 维护说明

- **新增或调整系统**：在 `src/types` / `src/config/routes.ts` / `src/systems/registry.ts` / `src/main.tsx` 中保持一致扩展，并新增 `src/systems/<id>/config.ts` 与对应 `pages` 入口。
- **更换主视觉**：优先按 `public/assets/login/README.txt` 覆盖路径或调整 `hero.abstractOnly` 等字段，避免裂图。
- **修改登录扩展默认行为**：先对照 `docs/specs/login-extension-freeze.md`，需要偏离冻结口径时走文档约定的变更流程。

---

**文档信息**：本 README 依据当前仓库文件梳理；未在仓库中出现的信息已标注 **待补充**，不臆测线上环境或组织内流程。
