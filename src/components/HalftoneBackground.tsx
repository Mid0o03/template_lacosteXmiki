import * as React from 'react';
import { HalftonePattern } from '../utils/halftone';

const HalftoneBackground: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            // We need to slightly modify HalftonePattern to accept element ref or ID
            // Since HalftonePattern class takes ID string, we give ID to canvas
            // Or better, update HalftonePattern to accept element.
            // For now, let's use ID since we control it.

            const pattern = new HalftonePattern('halftone-canvas', {
                dotSize: 6,
                spacing: 15,
                animationSpeed: 0.015,
                animationEffect: 'wave',
                baseColor: '#d9c9ff',
                backgroundColor: '#f6ecff'
            });

            return () => {
                pattern.destroy();
            };
        }
    }, []);

    return <canvas id="halftone-canvas" ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default HalftoneBackground;
