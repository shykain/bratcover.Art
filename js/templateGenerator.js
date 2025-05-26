// 页面模板生成器
class TemplateGenerator {
    constructor() {
        this.templates = {
            generator: this.generateGeneratorTemplate,
            color: this.generateColorTemplate,
            template: this.generateTemplatePageTemplate
        };
    }

    // 生成器页面模板
    generateGeneratorTemplate(params) {
        const { style, text } = params;
        return `
            <div class="generator-page">
                <header class="page-header">
                    <h1>Create "${text}" Brat Cover</h1>
                    <p class="subtitle">Generate your custom ${style} style Brat cover instantly</p>
                </header>

                <div class="generator-content">
                    <div class="preview-section">
                        <div class="canvas-wrapper" data-style="${style}" data-text="${text}">
                            <!-- Canvas will be inserted here by JS -->
                        </div>
                    </div>

                    <div class="controls-section">
                        <div class="control-group">
                            <label>Style Options</label>
                            <div class="style-buttons">
                                <!-- Style buttons will be generated here -->
                            </div>
                        </div>

                        <div class="control-group">
                            <label>Text Options</label>
                            <textarea class="text-input">${text}</textarea>
                        </div>

                        <div class="action-buttons">
                            <button class="download-btn">Download</button>
                            <button class="share-btn">Share</button>
                        </div>
                    </div>
                </div>

                <section class="related-covers">
                    <h2>Similar Covers</h2>
                    <div class="covers-grid">
                        <!-- Related covers will be generated here -->
                    </div>
                </section>

                <section class="seo-content">
                    <h2>About ${text} Brat Covers</h2>
                    <p>Create stunning ${style} style Brat covers with "${text}" text. Perfect for social media, album art, or personal projects.</p>
                    
                    <h3>How to Create Your ${text} Cover</h3>
                    <ol>
                        <li>Choose your preferred style from our ${style} templates</li>
                        <li>Customize the text and appearance</li>
                        <li>Download in high resolution</li>
                        <li>Share on social media</li>
                    </ol>

                    <div class="tags">
                        <span class="tag">brat</span>
                        <span class="tag">${style}</span>
                        <span class="tag">${text}</span>
                        <span class="tag">cover generator</span>
                    </div>
                </section>
            </div>
        `;
    }

    // 颜色页面模板
    generateColorTemplate(params) {
        const { colorCode } = params;
        return `
            <div class="color-page">
                <header class="page-header">
                    <h1>${colorCode} Brat Cover</h1>
                    <p class="subtitle">Create custom Brat covers with ${colorCode} background</p>
                </header>

                <div class="color-preview">
                    <div class="color-sample" style="background-color: #${colorCode}"></div>
                    <div class="color-info">
                        <p>Hex: #${colorCode}</p>
                        <p>RGB: ${this.hexToRgb(colorCode)}</p>
                    </div>
                </div>

                <div class="example-covers">
                    <h2>Example Covers with ${colorCode}</h2>
                    <div class="covers-grid">
                        <!-- Example covers will be generated here -->
                    </div>
                </div>

                <section class="color-description">
                    <h2>About ${colorCode} Covers</h2>
                    <p>Create unique Brat-style covers using ${colorCode} as your base color. Perfect for creating striking and memorable designs.</p>
                </section>
            </div>
        `;
    }

    // 模板页面
    generateTemplatePageTemplate(params) {
        const { category, name } = params;
        return `
            <div class="template-page">
                <header class="page-header">
                    <h1>${name} Template</h1>
                    <p class="subtitle">${category} style Brat cover template</p>
                </header>

                <div class="template-preview">
                    <!-- Template preview will be generated here -->
                </div>

                <div class="template-variations">
                    <h2>Style Variations</h2>
                    <div class="variations-grid">
                        <!-- Variations will be generated here -->
                    </div>
                </div>

                <section class="template-description">
                    <h2>About ${name} Template</h2>
                    <p>Create professional ${category} style Brat covers using our ${name} template. Perfect for ${this.getTemplateUseCase(category)}.</p>
                </section>
            </div>
        `;
    }

    // 辅助函数
    hexToRgb(hex) {
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return `${r}, ${g}, ${b}`;
    }

    getTemplateUseCase(category) {
        const uses = {
            classic: 'authentic Brat aesthetic',
            minimal: 'clean and modern designs',
            glitch: 'edgy and distorted effects',
            pixel: 'retro and gaming inspired art',
            neon: 'vibrant and glowing effects'
        };
        return uses[category] || 'creative projects';
    }

    // 生成页面
    generatePage(type, params) {
        if (this.templates[type]) {
            return this.templates[type](params);
        }
        return null;
    }
}

// 导出模板生成器实例
export default new TemplateGenerator(); 