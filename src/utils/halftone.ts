
export interface HalftoneOptions {
    dotSize?: number;
    spacing?: number;
    animationSpeed?: number;
    animationEffect?: 'wave' | 'pulse' | 'spiral';
    dotShape?: 'circle' | 'square';
    baseColor?: string;
    backgroundColor?: string;
    [key: string]: any;
}

export class HalftonePattern {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private settings: HalftoneOptions;
    private time: number;
    private animationFrameId: number | null = null;

    constructor(canvasId: string, options: HalftoneOptions = {}) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) throw new Error(`Canvas with id ${canvasId} not found`);

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d')!;

        // Default settings
        this.settings = {
            dotSize: 8,
            spacing: 12,
            animationSpeed: 0.02,
            animationEffect: 'wave', // 'wave', 'pulse', 'spiral'
            dotShape: 'circle', // 'circle', 'square'
            baseColor: '#d9c9ff',
            backgroundColor: '#f6ecff',
            ...options
        };

        this.time = 0;
        this.setupCanvas();
        this.animate();
    }

    private setupCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Handle resize
        window.addEventListener('resize', this.handleResize);
    }

    private handleResize = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    public updateSettings(newSettings: HalftoneOptions): void {
        this.settings = { ...this.settings, ...newSettings };
    }

    // ... (drawDot and calculateDotSize methods remain the same, simplified here for brevity if I was rewriting, but I'm replacing the end of file)

    private drawDot(x: number, y: number, size: number, alpha: number): void {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = this.settings.baseColor!;

        if (this.settings.dotShape === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (this.settings.dotShape === 'square') {
            this.ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }

        this.ctx.restore();
    }

    private calculateDotSize(x: number, y: number): { size: number; alpha: number } {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        let size = this.settings.dotSize!;
        let alpha = 0.8;

        switch (this.settings.animationEffect) {
            case 'wave':
                const waveX = Math.sin((x + this.time * 100) * 0.01) * 3;
                const waveY = Math.sin((y + this.time * 100) * 0.01) * 3;
                size += waveX + waveY;
                alpha = 0.5 + Math.sin(this.time * 2 + x * 0.01) * 0.3;
                break;

            case 'pulse':
                const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                const pulse = Math.sin(this.time * 3 - distance * 0.01) * 2;
                size += pulse;
                alpha = 0.4 + Math.sin(this.time * 2 - distance * 0.005) * 0.4;
                break;

            case 'spiral':
                const spiralDistance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                const angle = Math.atan2(y - centerY, x - centerX);
                const spiral = Math.sin(angle * 3 + this.time * 2 - spiralDistance * 0.01) * 3;
                size += spiral;
                alpha = 0.4 + Math.sin(angle * 2 + this.time * 1.5 - spiralDistance * 0.005) * 0.4;
                break;
        }

        return { size: Math.max(1, size), alpha: Math.max(0.1, Math.min(1, alpha)) };
    }

    private render(): void {
        // Clear canvas
        this.ctx.fillStyle = this.settings.backgroundColor!;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw halftone pattern
        if (this.settings.spacing && this.settings.spacing > 0) {
            for (let x = 0; x < this.canvas.width; x += this.settings.spacing) {
                for (let y = 0; y < this.canvas.height; y += this.settings.spacing) {
                    const { size, alpha } = this.calculateDotSize(x, y);
                    this.drawDot(x, y, size, alpha);
                }
            }
        }
    }

    private animate(): void {
        this.time += this.settings.animationSpeed!;
        this.render();
        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }

    public destroy(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        window.removeEventListener('resize', this.handleResize);
    }
}
