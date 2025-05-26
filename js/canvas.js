// Canvas utilities for Brat Generator

class BratCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.size = 800;
        this.setupCanvas();
    }
    
    setupCanvas() {
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.ctx.imageSmoothingEnabled = false;
    }
    
    renderBratCover(text, backgroundColor = 'green') {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.size, this.size);
        
        // Set background color
        this.ctx.fillStyle = backgroundColor === 'green' ? '#8BCF00' : '#FFFFFF';
        this.ctx.fillRect(0, 0, this.size, this.size);
        
        // Set text properties for Brat style
        this.ctx.fillStyle = '#000000';
        this.ctx.font = 'bold 120px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Draw text with pixelated effect
        const displayText = text.toLowerCase();
        this.ctx.fillText(displayText, this.size / 2, this.size / 2);
        
        return this.canvas.toDataURL();
    }
    
    downloadImage(filename = 'brat-cover.png') {
        const link = document.createElement('a');
        link.download = filename;
        link.href = this.canvas.toDataURL();
        link.click();
    }
}

// Export for use in other files
window.BratCanvas = BratCanvas; 