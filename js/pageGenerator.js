// 页面生成器
class PageGenerator {
    constructor() {
        this.templates = {
            colors: ['lime', 'white', 'black', 'pink', 'blue', 'purple'],
            popularTexts: ['brat', 'summer', 'pop', 'star', 'angel', 'devil', 'heaven', 'hell'],
            styles: ['classic', 'minimal', 'glitch', 'pixel', 'neon']
        };
    }

    // 生成所有可能的颜色组合页面的 sitemap
    generateColorsSitemap() {
        const colors = [];
        // 生成所有 16 进制颜色组合
        for (let r = 0; r < 256; r += 51) {
            for (let g = 0; g < 256; g += 51) {
                for (let b = 0; b < 256; b += 51) {
                    const hex = this.rgbToHex(r, g, b);
                    colors.push({
                        url: `/color/${hex}`,
                        lastmod: new Date().toISOString().split('T')[0],
                        priority: '0.5'
                    });
                }
            }
        }
        return this.generateSitemapXml(colors, 'colors');
    }

    // 生成热门文字组合页面的 sitemap
    generatePopularTextsSitemap() {
        const combinations = [];
        const texts = this.templates.popularTexts;
        
        // 生成单词组合
        for (let i = 0; i < texts.length; i++) {
            for (let j = 0; j < texts.length; j++) {
                if (i !== j) {
                    const combo = `${texts[i]}-${texts[j]}`;
                    combinations.push({
                        url: `/generator/classic/${combo}`,
                        lastmod: new Date().toISOString().split('T')[0],
                        priority: '0.7'
                    });
                }
            }
        }
        return this.generateSitemapXml(combinations, 'popular-texts');
    }

    // 生成模板页面的 sitemap
    generateTemplatesSitemap() {
        const templates = [];
        this.templates.styles.forEach(style => {
            templates.push({
                url: `/template/${style}`,
                lastmod: new Date().toISOString().split('T')[0],
                priority: '0.8'
            });
        });
        return this.generateSitemapXml(templates, 'templates');
    }

    // 生成主站地图
    generateMainSitemap() {
        const mainPages = [
            {url: '/', priority: '1.0'},
            {url: '/generator', priority: '0.9'},
            {url: '/templates', priority: '0.8'},
            {url: '/colors', priority: '0.8'},
            {url: '/trending', priority: '0.8'},
            {url: '/about', priority: '0.6'},
            {url: '/contact', priority: '0.5'}
        ];
        return this.generateSitemapXml(mainPages, 'main');
    }

    // 生成 sitemap XML
    generateSitemapXml(pages, type) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        pages.forEach(page => {
            xml += '  <url>\n';
            xml += `    <loc>https://bratcover.art${page.url}</loc>\n`;
            xml += `    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>\n`;
            xml += '    <changefreq>weekly</changefreq>\n';
            xml += `    <priority>${page.priority}</priority>\n`;
            xml += '  </url>\n';
        });
        
        xml += '</urlset>';
        return xml;
    }

    // RGB 转 16 进制
    rgbToHex(r, g, b) {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    // 生成所有 sitemap 文件
    generateAllSitemaps() {
        const sitemaps = {
            'sitemap-main.xml': this.generateMainSitemap(),
            'sitemap-colors.xml': this.generateColorsSitemap(),
            'sitemap-templates.xml': this.generateTemplatesSitemap(),
            'sitemap-popular-texts.xml': this.generatePopularTextsSitemap()
        };
        
        // 生成 sitemap 索引
        let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        Object.keys(sitemaps).forEach(filename => {
            indexXml += '  <sitemap>\n';
            indexXml += `    <loc>https://bratcover.art/${filename}</loc>\n`;
            indexXml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
            indexXml += '  </sitemap>\n';
        });
        
        indexXml += '</sitemapindex>';
        sitemaps['sitemap.xml'] = indexXml;
        
        return sitemaps;
    }
}

// 导出页面生成器实例
export default new PageGenerator(); 