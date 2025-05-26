// 路由处理
class Router {
    constructor() {
        this.routes = [];
        this.init();
    }

    init() {
        // 监听 URL 变化
        window.addEventListener('popstate', () => this.handleRoute());
        
        // 初始路由处理
        this.handleRoute();
    }

    addRoute(path, handler) {
        // 将路由路径转换为正则表达式
        const pattern = path.replace(/:\w+/g, '([^/]+)');
        this.routes.push({
            pattern: new RegExp(`^${pattern}$`),
            handler,
            originalPath: path
        });
    }

    handleRoute() {
        const path = window.location.pathname;
        
        // 查找匹配的路由
        const route = this.routes.find(route => route.pattern.test(path));
        
        if (route) {
            const params = this.extractParams(path, route);
            route.handler(params);
        } else {
            // 404 处理
            this.handle404();
        }
    }

    extractParams(path, route) {
        const matches = path.match(route.pattern);
        const params = {};
        
        if (matches) {
            const paramNames = route.originalPath
                .match(/:\w+/g)
                ?.map(param => param.substring(1)) || [];
            
            paramNames.forEach((name, index) => {
                params[name] = matches[index + 1];
            });
        }
        
        return params;
    }

    navigate(path) {
        window.history.pushState(null, '', path);
        this.handleRoute();
    }

    handle404() {
        document.getElementById('main-content').innerHTML = `
            <div class="error-page">
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you're looking for doesn't exist.</p>
                <a href="/" class="btn">Return Home</a>
            </div>
        `;
    }
}

// 创建路由实例
const router = new Router();

// 添加路由
router.addRoute('/', () => {
    // 主页处理
    loadHomePage();
});

router.addRoute('/generator/:style/:text', (params) => {
    // 生成器页面处理
    loadGenerator(params.style, params.text);
});

router.addRoute('/template/:category/:name', (params) => {
    // 模板页面处理
    loadTemplate(params.category, params.name);
});

router.addRoute('/color/:code', (params) => {
    // 颜色页面处理
    loadColorPage(params.code);
});

// 页面加载函数
function loadHomePage() {
    // 加载主页内容
}

function loadGenerator(style, text) {
    // 加载生成器页面
    document.title = `Create ${text} Brat Cover - Free Generator`;
    // 更新 meta 描述
    updateMetaDescription(`Create a custom Brat-style album cover with "${text}" text and ${style} style. Free online generator with authentic aesthetic.`);
    // 设置预览
    setPreviewText(text);
    setPreviewStyle(style);
}

function loadTemplate(category, name) {
    // 加载模板页面
    document.title = `${name} Template - Brat Cover Generator`;
    // 更新页面内容
}

function loadColorPage(colorCode) {
    // 加载颜色页面
    document.title = `${colorCode} Brat Cover - Color Variation`;
    // 更新页面内容
}

// 辅助函数
function updateMetaDescription(description) {
    document.querySelector('meta[name="description"]').setAttribute('content', description);
}

function setPreviewText(text) {
    // 更新预览文字
}

function setPreviewStyle(style) {
    // 更新预览样式
}

// 导出路由实例
export default router; 