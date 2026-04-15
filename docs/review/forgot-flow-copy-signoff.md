# 登录与忘记密码流程文案对照签认表

> 副标题可选：《忘记密码流程文案对照签认表》/《登录扩展文案对照签认表》——本文件将两类文案统一收录，便于一次签认。

---

## 1. 基本说明

本表用于在**上线或改版实现前**，对登录页扩展入口与忘记密码各阶段文案进行**逐字对照与签认**：

- **对照来源一**：旧系统真实页面（或同等权威的线上/验收环境截屏与可复制文本）。
- **对照来源二**：当前 Figma 流程稿中的文案（以设计稿为准进行摘录）。
- **签认目标**：在「Figma 文案」与「旧系统实际文案」不一致或存在多版本时，**逐项确定实现阶段最终采用的文字**（含标点、空格、换行展示策略如需要可在备注说明）。

**本表范围声明**：

- 本表**仅处理可见文案**（标题、说明、标签、占位符、按钮、链接、错误/频控提示等）。
- **不**在本表中约定交互逻辑、跳转规则、接口契约、埋点与无障碍细节；若文案签认牵涉上述项，请在备注中标注并另起专项文档跟进。

填写时请保持「**逐字**」原则：大小写、全半角、标点、括号内外空格等，均以最终签认列为准在实现中还原（或与产品/设计书面约定例外规则）。

---

## 2. 适用范围

本签认表至少覆盖以下界面与阶段（若实际项目增减页面，可在对应分组下增删行，勿改列结构）：

| 范围 | 说明 |
|------|------|
| 登录页 | 「记住账号密码」相关文案 |
| 登录页 | 「忘记密码」入口及相关辅助说明 |
| Forgot / input | 身份录入（如账号/手机/邮箱等，以设计为准） |
| Forgot / verify | 验证码或二次校验步骤 |
| Forgot / reset | 新密码设置 |
| Forgot / done | 成功完成态 |

---

## 3. 表格字段说明

各分组表格统一使用以下列（人工逐行填写）：

| 列名 | 说明 |
|------|------|
| 位置 ID | 稳定标识，建议跨版本沿用，便于开发与测试用例引用 |
| 页面 / 阶段 | 所属页面或流程阶段名称 |
| Figma 当前文案 | 从当前 Figma 流程稿**原样摘录**（勿凭记忆改写） |
| 旧系统实际文案 | 从旧系统页面**原样摘录**；无对应项可填「无」或「不适用」 |
| 最终采用文案 | 签认后实现与验收依据；应与最终上线文案一致 |
| 是否已确认 | 建议填「是」/「否」或「待定」 |
| 备注 | 多语言、AB 测试、法务提示、历史债务等 |

---

## 4. 分组签认表

### A. 登录页扩展入口

| 位置 ID | 页面 / 阶段 | Figma 当前文案 | 旧系统实际文案 | 最终采用文案 | 是否已确认 | 备注 |
|---------|-------------|----------------|----------------|--------------|------------|------|
| LOGIN-EXT-001 | 登录页 | 记住账号密码 | 记住账号密码 | | | 来源：`apps/frontend/src/lib/login/LoginPage.svelte`（`<label for="remember-me">`）。 |
| LOGIN-EXT-002 | 登录页 | 忘记密码 | 忘记密码？ | | | 来源：`apps/frontend/src/lib/login/LoginPage.svelte`（`/forgot-password` 链接文案）。 |
| LOGIN-EXT-003 | 登录页 | 待确认（Figma 稿未见固定文案） | 有效期30天 | | | 与「记住账号密码」同一行右侧辅助文案。来源：`apps/frontend/src/lib/login/LoginPage.svelte`。 |
| LOGIN-EXT-004 | 登录页 | 无 | 无 | | | 预留行：未再检出其它独立扩展入口固定字面量。 |

### B. Forgot / input

| 位置 ID | 页面 / 阶段 | Figma 当前文案 | 旧系统实际文案 | 最终采用文案 | 是否已确认 | 备注 |
|---------|-------------|----------------|----------------|--------------|------------|------|
| FORGOT-IN-001 | Forgot / input | 找回密码 | 重置密码 | | | 页内主标题 `<h2>`。浏览器 `<title>` 另有：`忘记密码 - TMS管理系统`。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-IN-002 | Forgot / input | 输入租户与联系方式以接收验证码。 | 选择方式找回您的账号密码 | | | 来源：`apps/frontend/src/routes/forgot-password/+page.svelte`（`step === 'input'` 副标题）。 |
| FORGOT-IN-003 | Forgot / input | 租户 ID (tenantId)；手机或邮箱 (target) | 租户ID | | | 本步首字段标签；同页随验证方式另有目标字段标签「手机号」或「邮箱地址」。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-IN-004 | Forgot / input | 必填；与 type 对应 | 请输入租户ID | | | 租户 ID 占位；手机方式下另有占位「请输入手机号」，邮箱方式下「请输入邮箱地址」。来源同上。 |
| FORGOT-IN-005 | Forgot / input | 方式 (type: phone&#124;email)；手机；邮箱 | 验证方式；手机号；邮箱 | | | 区块标题「验证方式」+ 两个切换按钮文案。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-IN-006 | Forgot / input | 发送验证码 | 获取验证码；发送中... | | | 主按钮默认/加载态。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-IN-007 | Forgot / input | 返回登录 | 返回登录 | | | 来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-IN-008 | Forgot / input | 倒计时 / 频控提示位 (占位)；冻结：同标识 60s，每日单号 10 次，每 IP 每小时 20 次 | 操作太频繁，请 N 秒后再试；今日验证码发送次数已达上限，请明天再试；请求过于频繁，请稍后再试 | | | 发码接口防刷/限额抛错文案（N 为服务端拼接数字）。来源：`apps/backend/src/modules/auth/member/verification-code.service.ts`。本步无前端固定「频控」句；验证码步重发按钮另有「Ns」倒计时形态（见 FORGOT-VE 备注）。 |
| FORGOT-IN-009 | Forgot / input | 发送失败 / 频控 / 网络 (占位) | 请输入租户ID；请输入有效的手机号；请输入有效的邮箱地址；发送验证码失败，请稍后重试；请输入有效的11位手机号 | | | 前四项为提交/接口失败默认文案或校验；末项为输入框下方格式提示（手机且已输入时）。另可展示接口 `err.message`。后端发码典型：`该手机号未关联任何账户` / `该邮箱未关联任何账户`；`验证码发送失败，请稍后重试`。来源：前端 `forgot-password/+page.svelte`，后端 `auth.service.ts`（forgotPasswordSendCode）。 |
| FORGOT-IN-010 | Forgot / input | 无 | 无 | | | 预留行：无额外固定字面量。 |

### C. Forgot / verify

| 位置 ID | 页面 / 阶段 | Figma 当前文案 | 旧系统实际文案 | 最终采用文案 | 是否已确认 | 备注 |
|---------|-------------|----------------|----------------|--------------|------------|------|
| FORGOT-VE-001 | Forgot / verify | 验证身份 | 重置密码 | | | 与 input 步共用 `<h2>`。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-VE-002 | Forgot / verify | 输入已发送的验证码。 | 请输入收到的验证码 | | | 来源：`apps/frontend/src/routes/forgot-password/+page.svelte`（`step === 'verify'`）。 |
| FORGOT-VE-003 | Forgot / verify | 验证码；请输入 | 验证码已发送至；验证码；请输入验证码；重新发送；{秒数}s | | | 「验证码已发送至」后接脱敏手机/邮箱（动态）；标签「验证码」、占位「请输入验证码」；重发按钮「重新发送」或倒计时「{秒数}s」（源码 `` `${countdown}s` ``，上屏如 60s、1s）。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-VE-004 | Forgot / verify | 进入下一步 | 下一步 | | | 来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-VE-005 | Forgot / verify | 返回上一步 | 上一步 | | | 来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-VE-006 | Forgot / verify | 返回登录 | 无 | | | 本步无「返回登录」按钮（仅 input / done 有）。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-VE-007 | Forgot / verify | 错报 / 状态 (占位) | 请输入验证码；发送验证码失败，请稍后重试 | | | 本地校验与重发失败默认文案；另可展示接口 `err.message`（含发码频控/账户不存在等，见 FORGOT-IN-008/009 后端句）。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-VE-008 | Forgot / verify | 无 | 无 | | | 预留行：无额外固定字面量。 |

### D. Forgot / reset

| 位置 ID | 页面 / 阶段 | Figma 当前文案 | 旧系统实际文案 | 最终采用文案 | 是否已确认 | 备注 |
|---------|-------------|----------------|----------------|--------------|------------|------|
| FORGOT-RS-001 | Forgot / reset | 设置新密码 | 重置密码 | | | 与其它步共用 `<h2>`。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-RS-002 | Forgot / reset | 提交后将调用重置接口。 | 设置您的新密码 | | | 来源：`apps/frontend/src/routes/forgot-password/+page.svelte`（`step === 'reset'`）。 |
| FORGOT-RS-003 | Forgot / reset | 新密码 (newPassword) | 新密码 | | | 来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-RS-004 | Forgot / reset | 仅单字段默认 | 请输入新密码 | | | 来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-RS-005 | Forgot / reset | 待确认（Figma 稿未见固定文案） | 确认新密码；请再次输入新密码 | | | 标签与占位。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-RS-006 | Forgot / reset | 规则提示 (冻结)：8-32 位，包含字母与数字，拒绝弱密码 | ○/✓ 至少 8 位；○/✓ 包含字母；○/✓ 包含数字；密码必须包含字母和数字，长度 8-32 位 | | | 前三项为输入中规则行（○ 未完成 / ✓ 已满足）；末项为提交校验错误句。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-RS-007 | Forgot / reset | 重置密码 | 重置密码；重置中... | | | 主按钮默认/加载态。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-RS-008 | Forgot / reset | 返回上一步 | 上一步 | | | 来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-RS-009 | Forgot / reset | 返回登录 | 无 | | | 本步无「返回登录」入口。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-RS-010 | Forgot / reset | 重置失败 / 策略不符 (占位) | 两次输入的密码不一致；密码必须包含字母和数字，长度 8-32 位；密码重置失败，请稍后重试 | | | 另可展示接口 `err.message`；后端校验失败典型：`验证码错误或已过期`；`用户不存在`；及密码策略 `validatePassword` 返回的多条（分号拼接，字面随策略）。来源：前端 `forgot-password/+page.svelte`，后端 `auth.service.ts`（forgotPasswordReset）。 |
| FORGOT-RS-011 | Forgot / reset | 无 | 无 | | | 预留行：无额外固定字面量。 |

### E. Forgot / done

| 位置 ID | 页面 / 阶段 | Figma 当前文案 | 旧系统实际文案 | 最终采用文案 | 是否已确认 | 备注 |
|---------|-------------|----------------|----------------|--------------|------------|------|
| FORGOT-DN-001 | Forgot / done | 完成 | 密码重置成功 | | | `<h3>` 成功标题。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-DN-002 | Forgot / done | 密码已重置。 | 您的密码已成功重置，请使用新密码登录。 | | | 来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-DN-003 | Forgot / done | 返回登录 | 返回登录 | | | 来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-DN-004 | Forgot / done | 成功状态文案区 (对齐旧前端具体文案)；→ 实现侧：回到登录页 / 登录路由 (与入口系统同源) | 密码重置完成；© 2026 TMS 运输管理系统. All rights reserved. | | | 同页顶部在 `done` 时副标题文案「密码重置完成」；页脚版权行。来源：`apps/frontend/src/routes/forgot-password/+page.svelte`。 |
| FORGOT-DN-005 | Forgot / done | 无 | 无 | | | 预留行：无额外固定字面量。 |

---

## 5. 签认区

| 角色 | 姓名 | 结论（同意 / 修订见表内） | 日期 |
|------|------|---------------------------|------|
| 产品确认 | | | |
| 设计确认 | | | |
| 开发确认 | | | |

**修订说明（可选）**：若签认会后对表内「最终采用文案」有批量修订，请在此简要列出版本与修订范围（日期 + 修订摘要）。

---

*文档模板版本：初版；用途为旧系统与 Figma 文案逐字对照签认，不涉及代码与 Figma 源文件修改。*
