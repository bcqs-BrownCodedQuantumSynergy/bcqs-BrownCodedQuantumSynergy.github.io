// 清华紫主题博客交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 自动生成文章目录
    generateTableOfContents();
    
    // 初始化滚动效果
    initScrollEffects();
    
    // 初始化交互按钮
    initInteractiveButtons();
    
    // 响应式导航
    initResponsiveNav();
});

/**
 * 自动生成文章目录
 */
function generateTableOfContents() {
    const tocContainer = document.getElementById('markdown-toc');
    if (!tocContainer) return;
    
    const article = document.querySelector('.post-content');
    if (!article) return;
    
    const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) {
        tocContainer.innerHTML = '<p class="no-toc">📝 本文暂无目录</p>';
        return;
    }
    
    let tocHTML = '<ul class="toc-list">';
    let currentLevel = 1;
    
    headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent.trim();
        const id = `heading-${index}`;
        
        // 为标题添加ID
        heading.id = id;
        
        // 处理层级
        if (level > currentLevel) {
            for (let i = currentLevel; i < level; i++) {
                tocHTML += '<ul>';
            }
        } else if (level < currentLevel) {
            for (let i = currentLevel; i > level; i--) {
                tocHTML += '</ul>';
            }
        }
        
        tocHTML += `<li><a href="#${id}" class="toc-link" data-level="${level}">${text}</a></li>`;
        currentLevel = level;
    });
    
    // 关闭未闭合的列表
    for (let i = currentLevel; i > 1; i--) {
        tocHTML += '</ul>';
    }
    tocHTML += '</ul>';
    
    tocContainer.innerHTML = tocHTML;
    
    // 添加点击事件
    tocContainer.querySelectorAll('.toc-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 120; // 考虑固定头部高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 更新活跃状态
                updateActiveTocLink(this);
            }
        });
    });
}

/**
 * 更新目录活跃状态
 */
function updateActiveTocLink(activeLink) {
    // 移除所有活跃状态
    document.querySelectorAll('.toc-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // 添加当前活跃状态
    activeLink.classList.add('active');
}

/**
 * 初始化滚动效果
 */
function initScrollEffects() {
    let ticking = false;
    
    function updateOnScroll() {
        updateActiveHeading();
        updateScrollProgress();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

/**
 * 根据滚动位置更新活跃标题
 */
function updateActiveHeading() {
    const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    let activeHeading = null;
    
    headings.forEach(heading => {
        const headingTop = heading.offsetTop - 150; // 偏移量
        if (scrollTop >= headingTop) {
            activeHeading = heading;
        }
    });
    
    if (activeHeading) {
        const activeLink = document.querySelector(`.toc-link[href="#${activeHeading.id}"]`);
        if (activeLink) {
            updateActiveTocLink(activeLink);
        }
    }
}

/**
 * 更新阅读进度（可选功能）
 */
function updateScrollProgress() {
    const article = document.querySelector('.post-content');
    if (!article) return;
    
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollTop / documentHeight) * 100;
    
    // 可以在这里添加进度条显示
    // 例如：更新头部的进度条
    const progressBar = document.querySelector('.reading-progress');
    if (progressBar) {
        progressBar.style.width = scrollProgress + '%';
    }
}

/**
 * 初始化交互按钮
 */
function initInteractiveButtons() {
    // 点赞按钮
    const likeBtn = document.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            
            if (this.classList.contains('liked')) {
                icon.style.color = '#e74c3c';
                this.style.transform = 'scale(1.1)';
                
                // 添加动画效果
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
                
                showToast('感谢您的点赞！❤️');
            } else {
                icon.style.color = '';
                showToast('已取消点赞');
            }
        });
    }
    
    // 分享按钮
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } else {
                // 降级处理：复制链接到剪贴板
                copyToClipboard(window.location.href);
                showToast('链接已复制到剪贴板！');
            }
        });
    }
}

/**
 * 复制文本到剪贴板
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // 降级处理
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

/**
 * 显示提示消息
 */
function showToast(message, duration = 3000) {
    // 移除现有的toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--tsinghua-purple);
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 20px rgba(67, 33, 126, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // 隐藏动画
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

/**
 * 响应式导航处理
 */
function initResponsiveNav() {
    // 检测移动设备
    function isMobile() {
        return window.innerWidth <= 968;
    }
    
    // 处理侧边栏在移动设备上的行为
    function handleSidebarDisplay() {
        const leftSidebar = document.querySelector('.left-sidebar');
        const rightSidebar = document.querySelector('.right-sidebar');
        
        if (isMobile()) {
            // 移动设备上可以添加折叠功能
            if (leftSidebar) {
                leftSidebar.style.display = 'block';
            }
            if (rightSidebar) {
                rightSidebar.style.display = 'block';
            }
        }
    }
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleSidebarDisplay);
    handleSidebarDisplay(); // 初始化
}

/**
 * 添加代码复制功能
 */
function initCodeCopyFeature() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentNode;
        
        // 创建复制按钮
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.className = 'code-copy-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            padding: 8px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s ease;
        `;
        
        // 设置pre为相对定位
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
        
        // 添加复制功能
        copyBtn.addEventListener('click', function() {
            const code = codeBlock.textContent;
            copyToClipboard(code);
            
            // 临时改变按钮图标
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = 'rgba(46, 204, 113, 0.8)';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-copy"></i>';
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
            
            showToast('代码已复制！');
        });
        
        // 悬停效果
        copyBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        copyBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
}

// 在DOM加载完成后初始化代码复制功能
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initCodeCopyFeature, 500); // 延迟执行，确保代码高亮完成
});

/**
 * 添加图片点击放大功能
 */
function initImageZoom() {
    const images = document.querySelectorAll('.post-content img');
    
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        
        img.addEventListener('click', function() {
            createImageModal(this.src, this.alt);
        });
    });
}

/**
 * 创建图片模态框
 */
function createImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        cursor: zoom-out;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    `;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    // 点击关闭
    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // ESC键关闭
    const closeOnEsc = function(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', closeOnEsc);
        }
    };
    document.addEventListener('keydown', closeOnEsc);
}

// 初始化图片缩放功能
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initImageZoom, 500);
});

/**
 * 平滑滚动到顶部
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 添加返回顶部按钮
document.addEventListener('DOMContentLoaded', function() {
    // 创建返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--tsinghua-purple);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(67, 33, 126, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // 滚动显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // 悬停效果
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'var(--tsinghua-purple-light)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'var(--tsinghua-purple)';
    });
});