// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Initialize generator if on generator page
    if (document.getElementById('preview-canvas')) {
        initializeGenerator();
        // Scroll to generator section on page load
        setTimeout(() => {
            document.getElementById('generator-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }
});

// Initialize the Brat cover generator
function initializeGenerator() {
    const canvas = document.getElementById('preview-canvas');
    const textInput = document.getElementById('text-input');
    const downloadBtn = document.getElementById('download-btn');
    const screenshotBtn = document.getElementById('screenshot-btn');
    const colorInputs = document.querySelectorAll('input[name="bg-color"]');
    const textColorInputs = document.querySelectorAll('input[name="text-color"]');
    const blurSlider = document.getElementById('blur-range');
    const blurValue = document.querySelector('.blur-value');
    const charCount = document.querySelector('.char-count');
    const statusText = document.querySelector('.status-text');
    const statusIndicator = document.querySelector('.status-indicator');
    
    if (!canvas || !textInput) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 800;
    
    // Initial render
    renderCover();
    updateCharCount();
    
    // Event listeners
    textInput.addEventListener('input', function() {
        renderCover();
        updateCharCount();
        updateStatus('typing');
    });
    
    textInput.addEventListener('blur', function() {
        updateStatus('ready');
    });
    
    // Add keyboard shortcuts
    textInput.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + D to download
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            if (downloadBtn && !downloadBtn.disabled) {
                downloadBtn.click();
            }
        }
    });
    
    colorInputs.forEach(input => {
        input.addEventListener('change', function() {
            renderCover();
            updateColorOptions();
            updateStatus('updating');
            setTimeout(() => updateStatus('ready'), 500);
        });
    });
    
    textColorInputs.forEach(input => {
        input.addEventListener('change', function() {
            renderCover();
            updateTextColorOptions();
            updateStatus('updating');
            setTimeout(() => updateStatus('ready'), 500);
        });
    });
    
    // Blur slider events
    if (blurSlider) {
        blurSlider.addEventListener('input', function() {
            renderCover();
            updateBlurValue();
            updateStatus('updating');
        });
        
        blurSlider.addEventListener('change', function() {
            updateStatus('ready');
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCover);
    }
    
    if (screenshotBtn) {
        screenshotBtn.addEventListener('click', showScreenshotTip);
    }
    
    // Initialize color options and blur value
    updateColorOptions();
    updateTextColorOptions();
    updateBlurValue();
    
    function updateCharCount() {
        if (charCount) {
            charCount.textContent = textInput.value.length;
        }
    }
    
    function updateStatus(status) {
        if (!statusText || !statusIndicator) return;
        
        switch (status) {
            case 'typing':
                statusText.textContent = 'Updating...';
                statusIndicator.style.background = '#ff9800';
                break;
            case 'generating':
                statusText.textContent = 'Generating...';
                statusIndicator.style.background = '#2196f3';
                break;
            case 'updating':
                statusText.textContent = 'Updating...';
                statusIndicator.style.background = '#ff9800';
                break;
            case 'ready':
            default:
                statusText.textContent = 'Ready';
                statusIndicator.style.background = '#8bc34a';
                break;
        }
    }
    
    function updateColorOptions() {
        // Update active color option styling
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            const input = option.querySelector('input[type="radio"]');
            if (input.checked) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    function updateTextColorOptions() {
        // Update active text color option styling
        const textColorOptions = document.querySelectorAll('.text-color-option');
        textColorOptions.forEach(option => {
            const input = option.querySelector('input[type="radio"]');
            if (input.checked) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    function updateBlurValue() {
        if (blurValue && blurSlider) {
            blurValue.textContent = blurSlider.value;
        }
    }
    
    function renderCover() {
        const text = textInput.value.toLowerCase() || 'brat';
        const selectedColor = document.querySelector('input[name="bg-color"]:checked').value;
        const selectedTextColor = document.querySelector('input[name="text-color"]:checked').value;
        const blurAmount = blurSlider ? parseFloat(blurSlider.value) : 4;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set background color
        switch (selectedColor) {
            case 'green':
                ctx.fillStyle = '#8bc34a';
                break;
            case 'white':
                ctx.fillStyle = '#ffffff';
                break;
            case 'black':
                ctx.fillStyle = '#000000';
                break;
            case 'pink':
                ctx.fillStyle = '#ff0080';
                break;
            case 'blue':
                ctx.fillStyle = '#0080ff';
                break;
            case 'purple':
                ctx.fillStyle = '#8000ff';
                break;
            default:
                ctx.fillStyle = '#8bc34a';
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Split text into lines (support for manual line breaks)
        const lines = text.split('\n').filter(line => line.trim() !== '');
        if (lines.length === 0) {
            lines.push('brat');
        }
        
        // Calculate font size based on text content
        const totalLength = text.length;
        const lineCount = lines.length;
        let fontSize = 120;
        
        // Adjust font size based on content
        if (lineCount > 1) {
            fontSize = Math.max(60, 120 - (lineCount - 1) * 25);
        }
        if (totalLength > 15) {
            fontSize = Math.max(50, fontSize - (totalLength - 15) * 2);
        }
        
        // Set text color based on user selection
        if (selectedTextColor === 'white') {
            ctx.fillStyle = '#ffffff';
        } else {
            ctx.fillStyle = '#000000';
        }
        
        ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Apply blur effect if needed
        if (blurAmount > 0) {
            ctx.filter = `blur(${blurAmount}px)`;
        } else {
            ctx.filter = 'none';
        }
        
        // Draw multiline text
        drawTextLines(ctx, lines, canvas.width / 2, canvas.height / 2, fontSize);
        
        // Reset filter
        ctx.filter = 'none';
        
        // Enable download button
        if (downloadBtn) {
            downloadBtn.disabled = false;
        }
    }
    
    function drawTextLines(ctx, lines, x, y, fontSize) {
        const lineHeight = fontSize * 1.1;
        const totalHeight = lines.length * lineHeight;
        const startY = y - totalHeight / 2 + lineHeight / 2;
        
        lines.forEach((line, index) => {
            // Handle long lines by wrapping them
            if (line.length > 20) {
                const words = line.split(' ');
                let currentLine = '';
                let subLines = [];
                
                for (let word of words) {
                    const testLine = currentLine + (currentLine ? ' ' : '') + word;
                    const metrics = ctx.measureText(testLine);
                    
                    if (metrics.width > canvas.width - 100 && currentLine) {
                        subLines.push(currentLine);
                        currentLine = word;
                    } else {
                        currentLine = testLine;
                    }
                }
                if (currentLine) {
                    subLines.push(currentLine);
                }
                
                // Draw wrapped sub-lines
                subLines.forEach((subLine, subIndex) => {
                    const subY = startY + (index * subLines.length + subIndex) * lineHeight;
                    ctx.fillText(subLine.trim(), x, subY);
                });
            } else {
                // Draw single line
                const lineY = startY + index * lineHeight;
                ctx.fillText(line.trim(), x, lineY);
            }
        });
    }
    
    function downloadCover() {
        updateStatus('generating');
        
        // Add a small delay for user feedback
        setTimeout(() => {
            const link = document.createElement('a');
            const text = textInput.value || 'brat';
            const sanitizedText = text.replace(/[^a-z0-9]/gi, '_');
            link.download = `brat_cover_${sanitizedText}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            updateStatus('ready');
        }, 500);
    }
    
    function showScreenshotTip() {
        // Check if it's mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        let message = '';
        if (isMobile) {
            message = '📱 移动端截图保存方法：\n\n' +
                     '1️⃣ 长按图片选择"保存图片"\n' +
                     '2️⃣ 使用手机截图功能\n' +
                     '3️⃣ 截图后裁剪保存\n\n' +
                     '💡 截图是最简单的保存方式！';
        } else {
            message = '💻 桌面端保存方法：\n\n' +
                     '1️⃣ 右键点击图片选择"图片另存为"\n' +
                     '2️⃣ 点击"Download PNG"按钮\n' +
                     '3️⃣ 使用截图工具截取\n\n' +
                     '📸 选择最方便的方式保存！';
        }
        
        alert(message);
    }
} 