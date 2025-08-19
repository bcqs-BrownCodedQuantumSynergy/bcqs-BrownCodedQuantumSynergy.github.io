# Claude Code 学习博客

> 一个技术大佬的 AI 编程助手深度探索之旅

## 🚀 特色功能

- **三栏专业布局**: 左侧目录、中间内容、右侧文章列表
- **清华紫主题**: 学术风格的优雅配色方案  
- **响应式设计**: 完美适配桌面、平板、手机
- **智能目录**: 自动生成文章目录，支持滚动定位
- **交互增强**: 代码复制、图片放大、分享功能

## 📁 项目结构

```
claude-code-blog/
├── _config.yml          # Jekyll 配置
├── _layouts/            # 页面布局模板
├── _posts/              # 博客文章
├── assets/              # 静态资源
│   ├── css/            # 样式文件
│   └── js/             # JavaScript 文件
├── index.html          # 首页
└── README.md           # 项目说明
```

## 🛠️ 本地开发

```bash
# 安装依赖
bundle install

# 启动开发服务器
bundle exec jekyll serve --livereload

# 访问 http://localhost:4000
```

## 📝 写作指南

### 创建新文章

在 `_posts` 目录下创建新文件，文件名格式：`YYYY-MM-DD-title.md`

### 文章头部格式

```yaml
---
layout: post
title: "文章标题"
date: 2025-08-19 12:00:00 +0800
author: 技术探索者
tags: [Claude Code, AI编程, 教程]
categories: [技术探索]
excerpt: "文章摘要..."
---
```

## 🚀 部署到 GitHub Pages

1. 创建 GitHub 仓库 `username.github.io`
2. 推送代码到仓库
3. 启用 GitHub Pages (Settings → Pages)
4. 访问 `https://username.github.io`

## 🎨 自定义主题

编辑 `assets/css/style.scss` 文件中的 CSS 变量：

```scss
:root {
  --tsinghua-purple: #43217E;
  --tsinghua-purple-light: #6A3FB3;
  --accent-gold: #FFD700;
  // 更多颜色配置...
}
```

## 📱 响应式断点

- **桌面端**: > 1200px (三栏布局)
- **平板端**: 968px - 1200px (调整栏宽)  
- **手机端**: < 968px (单栏布局)

## 🌟 技术栈

- **Jekyll**: 静态网站生成器
- **GitHub Pages**: 免费托管
- **SCSS**: CSS 预处理器
- **Font Awesome**: 图标库
- **JavaScript**: 交互功能

---

## 📄 License

MIT License - 自由使用和修改

## 🤝 贡献

欢迎 Issue 和 Pull Request！

---

**Happy Blogging! 🚀**