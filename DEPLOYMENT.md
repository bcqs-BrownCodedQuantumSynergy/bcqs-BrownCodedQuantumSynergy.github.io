# GitHub Pages 部署指南

## 📋 部署步骤

### 1. 创建 GitHub 仓库
```bash
# 初始化 git 仓库
git init
git add .
git commit -m "Initial commit: Claude Code 学习博客"

# 创建 GitHub 仓库 (需要先在 GitHub 网站创建仓库)
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git branch -M main
git push -u origin main
```

### 2. 配置 GitHub Pages
1. 进入 GitHub 仓库的 Settings 页面
2. 滚动到 "Pages" 部分
3. 在 "Source" 中选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 文件夹
5. 点击 "Save"

### 3. 更新配置文件
在 `_config.yml` 中更新以下内容：
```yaml
title: Claude Code 学习博客
description: 一个技术大佬的 AI 编程助手深度探索之旅
baseurl: ""
url: "https://yourusername.github.io"  # 替换为你的用户名

author:
  name: 你的名字
  email: your.email@example.com
  github: yourusername  # 替换为你的 GitHub 用户名
```

## 🚀 本地开发

### 安装依赖
```bash
# 安装 Ruby (如果还没安装)
# Windows: 下载 RubyInstaller
# macOS: brew install ruby
# Linux: sudo apt-get install ruby-full

# 安装 Jekyll
gem install jekyll bundler

# 安装项目依赖
bundle install
```

### 本地运行
```bash
# 启动本地服务器
bundle exec jekyll serve

# 或使用实时重载
bundle exec jekyll serve --livereload

# 访问 http://localhost:4000
```

## 📝 写作工作流

### 1. 创建新文章
```bash
# 在 _posts 目录创建新文件
# 文件名格式: YYYY-MM-DD-title.md
touch _posts/2025-08-19-new-article.md
```

### 2. 文章头部格式
```yaml
---
layout: post
title: "文章标题"
date: 2025-08-19 12:00:00 +0800
author: 技术探索者
tags: [tag1, tag2, tag3]
categories: [分类]
excerpt: "文章摘要..."
---
```

### 3. 发布流程
```bash
# 添加新文章
git add .
git commit -m "新增文章: 文章标题"
git push origin main

# GitHub Pages 会自动构建和部署
```

## 🎨 自定义样式

### 修改主题色
编辑 `assets/css/style.scss`:
```scss
// 修改主色调
$primary-color: #667eea;
$secondary-color: #764ba2;
```

### 添加自定义组件
在 `_includes` 目录中创建新的组件文件。

## 🔧 高级配置

### SEO 优化
- 已配置 `jekyll-seo-tag` 插件
- 在每篇文章中设置合适的 `excerpt`
- 使用描述性的文件名和标题

### 评论系统
可以集成 Disqus 或 Gitalk:
```yaml
# _config.yml
comments:
  provider: "disqus"
  disqus:
    shortname: "your-disqus-shortname"
```

### Google Analytics
```yaml
# _config.yml
google_analytics: "G-XXXXXXXXXX"
```

## 📊 监控和优化

### 性能监控
- 使用 Google PageSpeed Insights
- 监控 Core Web Vitals
- 优化图片和资源加载

### 访问统计
- Google Analytics
- GitHub Insights
- Cloudflare Analytics

## 🎯 推广技巧

1. **SEO 优化**: 使用相关关键词，写好 meta 描述
2. **社交媒体**: 分享到技术社区和社交平台
3. **交叉推广**: 在其他平台引用博客文章
4. **持续更新**: 保持定期更新的频率

---

## 🔗 相关资源

- [Jekyll 官方文档](https://jekyllrb.com/)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Markdown 语法指南](https://guides.github.com/features/mastering-markdown/)
- [Jekyll 主题库](https://jekyllthemes.io/)