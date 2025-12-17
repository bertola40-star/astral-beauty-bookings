import { useEffect, useRef, useMemo } from 'react';

interface ClickData {
  x_position: number;
  y_position: number;
}

interface ClickHeatmapProps {
  clicks: ClickData[];
  width?: number;
  height?: number;
}

const ClickHeatmap = ({ clicks, width = 400, height = 600 }: ClickHeatmapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Normalize clicks to canvas dimensions (assuming max viewport of 1920x1080)
  const normalizedClicks = useMemo(() => {
    return clicks.map(click => ({
      x: (click.x_position / 1920) * width,
      y: (click.y_position / 1080) * height,
    }));
  }, [clicks, width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background (page representation)
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);

    // Draw page sections representation
    ctx.fillStyle = '#16213e';
    ctx.fillRect(10, 10, width - 20, 80); // Header
    ctx.fillRect(10, 100, width - 20, 150); // Hero
    ctx.fillRect(10, 260, width - 20, 120); // Services
    ctx.fillRect(10, 390, width - 20, 100); // Reviews
    ctx.fillRect(10, 500, width - 20, 90); // Footer

    // Draw section labels
    ctx.fillStyle = '#4a5568';
    ctx.font = '10px sans-serif';
    ctx.fillText('Header', 20, 50);
    ctx.fillText('Hero', 20, 170);
    ctx.fillText('Servicios', 20, 320);
    ctx.fillText('Reviews', 20, 440);
    ctx.fillText('Footer', 20, 545);

    if (normalizedClicks.length === 0) {
      ctx.fillStyle = '#718096';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Sin datos de clics', width / 2, height / 2);
      return;
    }

    // Create heatmap effect
    normalizedClicks.forEach(click => {
      // Create radial gradient for each click point
      const gradient = ctx.createRadialGradient(
        click.x, click.y, 0,
        click.x, click.y, 30
      );
      gradient.addColorStop(0, 'rgba(255, 100, 50, 0.4)');
      gradient.addColorStop(0.5, 'rgba(255, 50, 50, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(click.x, click.y, 30, 0, Math.PI * 2);
      ctx.fill();
    });

    // Add intensity overlay for clusters
    const gridSize = 20;
    const grid: number[][] = [];

    for (let i = 0; i < Math.ceil(width / gridSize); i++) {
      grid[i] = [];
      for (let j = 0; j < Math.ceil(height / gridSize); j++) {
        grid[i][j] = 0;
      }
    }

    // Count clicks in each grid cell
    normalizedClicks.forEach(click => {
      const gridX = Math.floor(click.x / gridSize);
      const gridY = Math.floor(click.y / gridSize);
      if (grid[gridX] && grid[gridX][gridY] !== undefined) {
        grid[gridX][gridY]++;
      }
    });

    // Find max for normalization
    let maxCount = 0;
    grid.forEach(row => {
      row.forEach(count => {
        if (count > maxCount) maxCount = count;
      });
    });

    // Draw intensity cells
    if (maxCount > 0) {
      grid.forEach((row, i) => {
        row.forEach((count, j) => {
          if (count > 0) {
            const intensity = count / maxCount;
            const hue = 60 - (intensity * 60); // Yellow to red
            ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${intensity * 0.5})`;
            ctx.fillRect(i * gridSize, j * gridSize, gridSize, gridSize);
          }
        });
      });
    }

    // Draw click points
    normalizedClicks.forEach(click => {
      ctx.beginPath();
      ctx.arc(click.x, click.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
    });

  }, [normalizedClicks, width, height]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-lg border border-border"
      />
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm p-2 rounded text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span>Bajo</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span>Medio</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Alto</span>
        </div>
      </div>
    </div>
  );
};

export default ClickHeatmap;
