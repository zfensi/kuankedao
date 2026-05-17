# 宽客岛（Kuankedao）
全球推广资源对接平台（资源聚合 / 渠道连接 / 推广撮合 / 社区品牌）

## 本地开发
```bash
npm install
npm run dev
```

## 当前迭代目标
- 支持 `中文`、`英文`、`繁体中文`、`日文`、`韩文` 5 种语言
- 默认语言为 `中文`
- 页面访问路径统一使用带语言前缀的 `.html` 结尾形式
- 中文站可采用根路径页面，如 `/index.html`
- 其他语言站点使用语言前缀路径，如 `/en/index.html`
- 页面视觉风格以 `简洁、大方、干净` 为核心要求

## 页面规范
| 项目 | 规范 |
|------|------|
| 语言代码 | `zh-CN`、`en`、`zh-TW`、`ja`、`ko` |
| 默认语言 | `zh-CN` |
| 首页路径 | `/index.html`、`/en/index.html`、`/zh-tw/index.html`、`/ja/index.html`、`/ko/index.html` |
| 一级栏目路径示例 | `/resources.html`、`/en/resources.html` |
| 详情页路径示例 | `/resources/google-ads.html`、`/en/resources/google-ads.html` |

## 实施说明
- 当前仓库已具备 React + Vite + i18n 基础结构，但现状仅覆盖 `zh/en`
- 当前前端路由仍为 SPA 风格路径，尚未切换到 `.html` 结尾规范
- 本轮开发将优先统一文档、路由映射、语言结构与页面视觉基线，再逐步补全多语言内容

## Cloudflare Workers + D1 部署
本项目使用同一个 Cloudflare Worker 同时托管静态站点（Vite build 输出 dist）与 /api 接口，数据库使用 Cloudflare D1。

1) 登录并初始化
```bash
npx wrangler login
```

2) 创建 D1 数据库
```bash
npx wrangler d1 create kuankedao-db
```
把创建结果里的 `database_id` 填到 [wrangler.toml](file:///d:/Source/kuankedao.com/wrangler.toml) 的 `database_id`。

3) 初始化表结构（本地 / 线上二选一或都执行）
```bash
npm run cf:d1:migrate:local
npm run cf:d1:migrate:remote
```

4) 构建并部署
```bash
npm run build
npm run cf:deploy
```

## 主要文档
- [宽客岛-产品需求文档.md](file:///d:/Source/kuankedao.com/.trae/documents/%E5%AE%BD%E5%AE%A2%E5%B2%9B-%E4%BA%A7%E5%93%81%E9%9C%80%E6%B1%82%E6%96%87%E6%A1%A3.md)
- [宽客岛-技术架构文档.md](file:///d:/Source/kuankedao.com/.trae/documents/%E5%AE%BD%E5%AE%A2%E5%B2%9B-%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%E6%96%87%E6%A1%A3.md)
