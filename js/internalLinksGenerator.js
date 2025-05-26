// 内部链接生成器
class InternalLinksGenerator {
    constructor() {
        this.popularCombinations = [
            'brat-summer',
            'pop-star',
            'angel-devil',
            'heaven-hell'
        ];
        
        this.categories = [
            'classic',
            'minimal',
            'glitch',
            'pixel',
            'neon'
        ];
        
        this.colors = [
            'lime',
            'white',
            'black',
            'pink',
            'blue',
            'purple'
        ];
    }

    // 生成相关封面链接
    generateRelatedCovers(currentText, currentStyle) {
        const related = [];
        
        // 添加相同风格的其他文字组合
        this.popularCombinations.forEach(combo => {
            if (!combo.includes(currentText)) {
                related.push({
                    url: `/generator/${currentStyle}/${combo}`,
                    title: `${combo} in ${currentStyle} style`,
                    type: 'style'
                });
            }
        });

        // 添加相同文字的其他风格
        this.categories.forEach(style => {
            if (style !== currentStyle) {
                related.push({
                    url: `/generator/${style}/${currentText}`,
                    title: `${currentText} in ${style} style`,
                    type: 'text'
                });
            }
        });

        return related;
    }

    // 生成标签云
    generateTagCloud() {
        const tags = [];
        
        // 添加风格标签
        this.categories.forEach(style => {
            tags.push({
                text: style,
                url: `/style/${style}`,
                weight: this.getTagWeight(style)
            });
        });

        // 添加颜色标签
        this.colors.forEach(color => {
            tags.push({
                text: color,
                url: `/color/${color}`,
                weight: this.getTagWeight(color)
            });
        });

        // 添加热门组合标签
        this.popularCombinations.forEach(combo => {
            tags.push({
                text: combo,
                url: `/generator/classic/${combo}`,
                weight: this.getTagWeight(combo)
            });
        });

        return tags;
    }

    // 生成面包屑导航
    generateBreadcrumbs(path) {
        const parts = path.split('/').filter(part => part);
        const breadcrumbs = [{
            text: 'Home',
            url: '/'
        }];

        let currentPath = '';
        parts.forEach((part, index) => {
            currentPath += `/${part}`;
            breadcrumbs.push({
                text: this.formatBreadcrumbText(part),
                url: currentPath
            });
        });

        return breadcrumbs;
    }

    // 生成页面底部相关链接
    generateFooterLinks() {
        return {
            styles: this.categories.map(style => ({
                text: `${style} Style`,
                url: `/style/${style}`
            })),
            colors: this.colors.map(color => ({
                text: `${color} Covers`,
                url: `/color/${color}`
            })),
            popular: this.popularCombinations.map(combo => ({
                text: combo.replace('-', ' '),
                url: `/generator/classic/${combo}`
            }))
        };
    }

    // 辅助函数
    getTagWeight(tag) {
        // 根据使用频率或重要性分配权重
        const weights = {
            'classic': 10,
            'minimal': 8,
            'lime': 9,
            'brat-summer': 10,
            'pop-star': 8
        };
        return weights[tag] || 5;
    }

    formatBreadcrumbText(text) {
        return text
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}

// 导出内部链接生成器实例
export default new InternalLinksGenerator(); 