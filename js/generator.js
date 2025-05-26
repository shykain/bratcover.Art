// Brat Cover Generator functionality

let canvas, ctx;

function initGenerator() {
    canvas = document.getElementById('preview-canvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    // Set up event listeners
    const textInput = document.getElementById('text-input');
    const colorOptions = document.querySelectorAll('input[name="bg-color"]');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    
    if (textInput) {
        textInput.addEventListener('input', updatePreview);
    }
    
    colorOptions.forEach(option => {
        option.addEventListener('change', updatePreview);
    });
    
    if (generateBtn) {
        generateBtn.addEventListener('click', generateCover);
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadImage);
    }
    
    // Initial render
    renderCover('brat', 'green');
}

function updatePreview() {
    const text = document.getElementById('text-input').value || 'brat';
    const color = document.querySelector('input[name="bg-color"]:checked').value;
    renderCover(text, color);
}

function renderCover(text, bgColor) {
    const size = 800;
    canvas.width = size;
    canvas.height = size;
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Set background
    if (bgColor === 'green') {
        ctx.fillStyle = '#8BCF00';
    } else {
        ctx.fillStyle = '#FFFFFF';
    }
    ctx.fillRect(0, 0, size, size);
    
    // Set text properties
    ctx.fillStyle = bgColor === 'green' ? '#000000' : '#000000';
    ctx.font = 'bold 120px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add pixelated effect by scaling down and up
    ctx.imageSmoothingEnabled = false;
    
    // Draw text
    const displayText = text.toLowerCase();
    ctx.fillText(displayText, size / 2, size / 2);
    
    // Enable download button
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.disabled = false;
    }
}

function generateCover() {
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        generateBtn.textContent = 'Generating...';
        generateBtn.disabled = true;
        
        setTimeout(() => {
            updatePreview();
            generateBtn.textContent = 'Generate Cover';
            generateBtn.disabled = false;
        }, 500);
    }
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'brat-cover.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Share functionality
document.addEventListener('DOMContentLoaded', function() {
    const twitterShare = document.querySelector('.twitter-share');
    const instagramShare = document.querySelector('.instagram-share');
    
    if (twitterShare) {
        twitterShare.addEventListener('click', function() {
            const text = 'Check out my custom Brat cover created with bratcover.art! #BratSummer #CharliXCX';
            const url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
            window.open(url, '_blank');
        });
    }
    
    if (instagramShare) {
        instagramShare.addEventListener('click', function() {
            alert('Download your image and share it on Instagram with #BratSummer #CharliXCX');
        });
    }
}); 