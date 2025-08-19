# Claude Code 学习博客

<<<<<<< HEAD
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
=======
> 一个技术大佬的 Claude Code 深度学习之旅

## 📖 博客系列

### 第一章：初探 Claude Code
- [01-初体验和环境配置](./posts/01-initial-experience.md)
- [02-基础功能使用](./posts/02-basic-features.md)
- [03-文件操作与代码编辑](./posts/03-file-operations.md)

### 第二章：进阶使用
- [04-项目管理技巧](./posts/04-project-management.md)
- [05-调试和测试](./posts/05-debugging-testing.md)
- [06-高级工作流](./posts/06-advanced-workflows.md)

### 第三章：最佳实践
- [07-效率提升技巧](./posts/07-productivity-tips.md)
- [08-常见问题解决](./posts/08-troubleshooting.md)
- [09-与其他工具集成](./posts/09-tool-integration.md)

## 🎯 学习目标

- [ ] 掌握 Claude Code 基础操作
- [ ] 理解 AI 辅助编程的核心理念
- [ ] 建立高效的开发工作流
- [ ] 探索 Claude Code 的高级特性
- [ ] 分享实用的使用技巧

## 📊 学习进度

| 阶段 | 状态 | 完成时间 |
|------|------|----------|
| 环境配置 | ✅ | 2025-08-19 |
| 基础使用 | 🔄 | - |
| 进阶技巧 | ⏳ | - |
| 最佳实践 | ⏳ | - |

## 🔗 相关资源

- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code)
- [GitHub Repository](https://github.com/anthropics/claude-code)

---

*记录每一步学习，分享每一个发现 🚀*
>>>>>>> 52a0353e3b6819d364c19ac6f195af59ac20766f
