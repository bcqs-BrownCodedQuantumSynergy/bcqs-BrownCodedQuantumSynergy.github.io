// Material Design 清华紫主题交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMobileNav();
    initThemeToggle();
    initHighlight();
    
    console.log('Claude Code 博客已加载完成 ✨');
});

/**
 * 移动端导航功能
 */
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (!navToggle || !sidebar || !overlay) return;
    
    // 切换侧边栏显示
    navToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    });
    
    // 点击遮罩关闭侧边栏
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // 响应式处理
    function handleResize() {
        if (window.innerWidth > 1220) { // 76.25em
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    window.addEventListener('resize', handleResize);
}

/**
 * 主题切换功能
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // 读取保存的主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // 主题切换事件
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // 更新代码高亮主题
        updateCodeTheme(theme);
    }
}

/**
 * 更新代码高亮主题
 */
function updateCodeTheme(theme) {
    const existingLink = document.querySelector('link[href*="highlight.js"]');
    if (!existingLink) return;
    
    const newHref = theme === 'dark' 
        ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css'
        : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css';
    
    if (existingLink.href !== newHref) {
        existingLink.href = newHref;
    }
}

/**
 * 代码高亮初始化
 */
function initHighlight() {
    // 高亮所有代码块
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
        
        // 为代码块添加复制功能
        addCopyButtons();
    }
}

/**
 * 为代码块添加复制按钮
 */
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentNode;
        
        // 跳过已经有复制按钮的代码块
        if (pre.querySelector('.copy-btn')) return;
        
        // 创建复制按钮
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.title = '复制代码';
        
        // 设置样式
        copyBtn.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: var(--md-primary-fg-color);
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 0.25rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease, background-color 0.2s ease;
            font-size: 0.8rem;
            z-index: 10;
        `;
        
        // 设置父容器为相对定位
        pre.style.position = 'relative';
        
        // 添加悬停效果
        pre.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0';
        });
        
        // 复制功能
        copyBtn.addEventListener('click', async function() {
            const code = codeBlock.textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                
                // 临时改变按钮状态
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.backgroundColor = '#4CAF50';
                this.style.opacity = '1';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                    this.style.backgroundColor = 'var(--md-primary-fg-color)';
                }, 2000);
                
                showToast('代码已复制到剪贴板');
                
            } catch (err) {
                console.error('复制失败:', err);
                showToast('复制失败，请手动复制');
            }
        });
        
        pre.appendChild(copyBtn);
    });
}

/**
 * 显示提示消息
 */
function showToast(message, duration = 3000) {
    // 移除现有的 toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的 toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 4rem;
        right: 1rem;
        background: var(--md-primary-fg-color);
        color: white;
        padding: 0.75rem 1rem;
        border-radius: 0.25rem;
        box-shadow: var(--md-shadow-z2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 0.9rem;
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
 * 平滑滚动到锚点
 */
function smoothScrollToAnchor() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 自动生成文章目录（如果需要）
 */
function generateTOC() {
    const article = document.querySelector('.md-content__inner');
    if (!article) return;
    
    const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length < 3) return; // 标题太少不生成目录
    
    // 在这里可以添加目录生成逻辑
    // 由于采用简洁设计，暂时不实现
}

// 在页面加载完成后执行额外的初始化
window.addEventListener('load', function() {
    smoothScrollToAnchor();
    generateTOC();
});

// 主题切换的键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Shift + D 切换主题
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }
});