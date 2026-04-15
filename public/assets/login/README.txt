Place your hero image here as:

  wms-hero.webp
  tms-hero.webp

Optional ambient (template C, e.g. BMS):

  bms-ambient.webp — 极轻、低对比秩序感底图（当前仓库已内置示例）。
  对应系统 config 中 `hero.abstractOnly: false` 时加载；若临时移除文件，
  请改回 abstractOnly: true，避免 broken image。

  ams-ambient.webp — AMS 模板 C 弱氛围（约 1920×1071 WebP）；与 BMS/HR 冷蓝底、CRM 暗底区分。
  更高像素定稿可覆盖同路径；若移除文件须将 AMS config 改 `abstractOnly: true` 以免裂图。

Template B（CRM 等）全幅氛围：

  crm-ambient.webp — CRM 模板 B 全幅氛围（AI 出图后经 Pillow 落盘为 WebP，约 1920×1071）。
  若定稿要更锐的半屏主视觉，建议另出 ≥约 2400px 宽成片后覆盖同路径。

  ubp-ambient.webp — 统一业务平台（中枢入口）模板 B 全幅氛围。与 CRM 区分：偏「侧向光带汇入 + 中央环形枢纽」；定稿覆盖同路径（当前约 1920×1280 WebP，由定稿 PNG 经 Pillow 导出）。

  —— ubp-ambient：AI 生图提示词（可直接粘贴到即梦 / Midjourney / DALL·E / 通义万相等）——

  【中文主提示词】
  超宽横版登录页背景图，企业级 B 端产品视觉，深蓝灰与炭黑单色体系，无文字无 logo 无 UI 截图。画面母题是「数字中枢与多系统汇聚」：中央略亮、边缘自然暗角；若干稀疏、大小不一的柔和光点呈向心趋势但不画成星座或具体地图；2～3 条极淡的宽尺度弧线或薄环带穿过画面，暗示路由与编排，不要密铺小三角形网格。极少量细线连接少量节点即可，线要淡、留白要大，整体比典型「科技网格底纹」更疏朗、更门户感。微弱体积雾增加纵深，光感克制不霓虹。风格：干净、冷静、高阶、印刷级平滑渐变，无人物无车辆无仓库无办公桌。

  【English master prompt】
  Ultra-wide landscape login background for enterprise SaaS, deep navy charcoal monochrome, soft vignette brighter toward center, darker edges. Visual metaphor: digital control plane and multi-system convergence — a few sparse glowing nodes with very faint connecting lines (not dense), 2–3 subtle large-radius arcs or thin rings suggesting routing/orchestration, avoid tight polygon mesh or neural-net clutter. Generous negative space, calm restrained lighting, no neon, no text, no logos, no UI mockups, no photos of people, vehicles, warehouses, or offices. Premium minimal abstract atmosphere, print-smooth gradients, subtle volumetric haze for depth.

  【负向 / Negative】
  文字、字母、数字、水印、二维码、品牌标识、界面、按钮、图表、地图轮廓、国旗、人脸、手、卡车、集装箱、货架、照片写实场景、彩虹色、强霓虹、密集小三角网格、满屏节点、低分辨率、JPEG 块状噪点、明显对称复制拼贴。

  text, typography, watermark, logo, UI, buttons, charts, map shapes, faces, hands, trucks, shipping, warehouse photo, rainbow colors, heavy neon, dense polygon mesh, cluttered nodes, JPEG artifacts, obvious mirrored tiling.

  Recommended export: ~2400×1350 (or 1920×1080) landscape WebP; center-safe composition (login card sits center).

  —— ubp-ambient：激进版（更强「统一中枢」感，ChatGPT 生图可整段粘贴）——
  说明：比上一版更「有能量」，但仍须保留**中心略暗或略空的「阅读安全区」**（约画面宽 28%～36% 的椭圆内少纹理），避免与 CRM 那种「中间一条柔光带 + 几根细弧线」的保守抽象撞脸。

  【中文 · 激进版 · 单条提示词】
  超宽横版企业登录页抽象背景，深蓝灰与近黑底色。视觉母题改为**「多路数据流汇入同一编排中枢」**：从画面四角与左右边缘，各有**多条**略宽于细线的**光带/能量轨迹**（带极轻运动模糊或拖尾感）向**中圈**汇聚，在中圈形成**一道清晰的环形高亮带或扁环形光晕**（像网关外沿），**环形内侧即画面几何中心保持更暗、更干净、几乎无碎线**，像给白色登录卡片预留的「井口」；中圈到外缘可有**分层纵深**（前中后景三层模糊强度不同）、微弱粒子与少量节点，但**禁止**整屏均匀细三角网格、禁止「只有中间一条水平光带」的极简 CRM 风。允许**极少量的冷青色（cyan-teal）**作为高光勾边，面积不超过画面高光的 15%，主色仍为蓝灰单色体系，不要彩虹、不要强霓虹。无文字、无 logo、无 UI、无地图、无写实物体。

  【English · aggressive · single block for ChatGPT】
  Ultra-wide abstract enterprise login background, deep navy near-black. Visual metaphor: many data/light ribbons and energy trails entering from corners and side edges, converging into a clear mid-radius bright ring or flattened torus glow (gateway rim), while the geometric center stays darker, calmer, and almost texture-free like a circular safe zone for a white login card (~30% of frame width). Stronger depth: 3 depth layers with different blur strength, subtle particles, a few nodes on the ring — avoid uniform fine polygon mesh across the whole image, avoid the cliché “single soft horizontal glow band with a few thin arcs” CRM-like minimalism. Allow a small amount of cold cyan-teal accent on highlights only (<=15% of highlight area), no rainbow, no heavy neon. No text, logos, UI, maps, realistic objects.

  【若仍偏 CRM，在同会话追加一句】
  「去掉水平中轴主光带；把动势改成**径向汇聚 + 环形枢纽**；中心暗、外圈与中圈亮。」

  —— end ubp-ambient prompts ——

若文件缺失且未改 abstractOnly，浏览器会显示裂图；开发时请先检查 public 路径。
