# PWA 任务管理器

一个基于 Vite + React + MUI 的渐进式 Web 应用（PWA）。实现的功能：新增任务、标记完成、删除任务，并在离线时仍可使用（通过 `localStorage` 持久化与简单 service worker 缓存静态资源）。

目录结构（主要文件）：
- `index.html` - 应用入口
- `src/main.jsx` - React 入口并注册 service worker
- `src/App.jsx` - 主组件，管理任务状态与本地存储
- `src/components/TaskInput.jsx` - 新增任务输入
- `src/components/TaskList.jsx` - 任务列表（完成/删除）
- `src/sw.js` - 简单的 service worker，用于缓存静态资源以支持离线
- `public/manifest.json` - PWA manifest

快速开始（macOS / zsh）：

```bash
cd pwa-task-manager
npm install
npm run dev
```

前置：Node.js / npm 安装说明（macOS）
---------------------------------
如果你在运行 `npm install` 时看到 `zsh: command not found: npm`，说明本机尚未安装 Node.js。下面是两个常见安装方法：

- 使用 Homebrew （推荐，简单）

```bash
# 如果未安装 Homebrew，请先安装：
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# 然后安装 Node（包含 npm）:
brew install node
```

- 使用 nvm（推荐用于多个 Node 版本管理）

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
# 载入 nvm（或重启终端）
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# 安装并使用 LTS 版本：
nvm install --lts
nvm use --lts
```

安装完成后验证：

```bash
node -v
npm -v
```

如果出现权限或网络问题，可尝试：

```bash
npm cache clean --force
npm install --legacy-peer-deps
```

注意：如果你选择在本地让我（agent）运行 `brew install node`，请先确认你允许我在当前环境执行 Homebrew 安装命令；默认我不会在没有你明确许可的情况下修改系统工具。

生产构建与预览：

```bash
npm run build
npm run preview
```

离线验证：
1. 在 `npm run dev` 或 `preview` 的页面加载后，打开浏览器的开发者工具 -> Application -> Service Workers，确认 `sw.js` 注册成功。
2. 关闭网络（offline 模式）并刷新页面，应用应仍能加载（已缓存的静态资源）并且之前保存的任务仍存在（`localStorage`）。

注意事项：
- 本示例使用 `localStorage` 做持久化，适合小规模任务和离线优先场景。如果你需要多设备同步或更复杂的离线策略，考虑使用 IndexedDB / background sync / server sync。
- 当前 `sw.js` 是一个简单的缓存实现，适合开发和离线演示；若需要更健壮的缓存策略（版本化、回退页面、图片缓存策略等），建议使用 `workbox` 或 `vite-plugin-pwa`。

生成 PNG 图标（可选，但推荐用于兼容性）
---------------------------------
我们在 `public/icons` 中提供了两个 SVG 占位图：`icon-192.svg` 和 `icon-512.svg`。
多数平台对 PNG 更兼容，建议把 SVG 转换为 PNG 并提交到仓库。项目包含一个便捷脚本：

```bash
# 安装依赖工具 (macOS 示例)：
brew install imagemagick   # 或者 brew install librsvg

# 生成 PNG 图标
bash scripts/generate_icons.sh
```

脚本会生成：`public/icons/icon-192.png` 与 `public/icons/icon-512.png`。`manifest.json` 已包含 PNG 条目作为首选图标（SVG 作为回退）。`src/sw.js` 也会把 PNG 一并预缓存（如果存在）。

部署到 GitHub Pages（快速步骤）
---------------------------------
1. 创建 GitHub 仓库并推送代码。
2. 在本地：

```bash
npm install
npm run build
# 使用 gh-pages 发布 dist 目录（可选，需全局或本地安装 gh-pages）
npx gh-pages -d dist
```

3. 在 GitHub 仓库设置中启用 GitHub Pages（选择 `gh-pages` 分支）。

注意：GitHub Pages 提供 HTTPS，PWA 的 service worker 需要 HTTPS 环境以正常运行（或在 localhost 下）。

在设备上安装 PWA
------------------
- Chrome / Edge 桌面：访问站点 -> 点击地址栏右侧的“安装”按钮（或在菜单中选择“安装应用”）。
- Android Chrome：在站点打开后，Chrome 会提示“Add to Home screen”；也可以通过菜单 `Add to Home screen`。
- iOS Safari：Safari 对 PWA 支持有限，需手动在分享菜单选择“Add to Home Screen”，且 service worker 行为与 Android/Chrome 不完全相同。

如果你需要，我可以：
- 为你生成并提交 PNG 图标文件（我需要运行图像工具，或你允许我将 base64 PNG 写入仓库）。
- 或在 CI 中自动生成图标（需配置 CI runner 安装 imagemagick 或 librsvg）。

如需我把应用部署到 GitHub Pages 或者完善离线策略（用 `workbox` 或 `vite-plugin-pwa`），我可以继续实现。