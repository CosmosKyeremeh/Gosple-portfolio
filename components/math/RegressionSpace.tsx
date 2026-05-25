'use client';

import { useRef, useState, useMemo, useEffect } from 'react' 
import { Terminal, Plus, Trash2 } from 'lucide-react';
import { BlockMath } from '@/lib/katex-render'

interface Point {
  x: number;
  y: number;
}

export default function RegressionSpace() {
  const [points, setPoints] = useState<Point[]>([
    { x: 1, y: 1.2 },
    { x: 2, y: 1.8 },
    { x: 3, y: 2.6 },
    { x: 4, y: 3.1 },
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const slope = useMemo(() => {
    if (points.length < 2) return 0;
    const n = points.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    points.forEach((p) => {
      sumX  += p.x;
      sumY  += p.y;
      sumXY += p.x * p.y;
      sumXX += p.x * p.x;
    });
    const denominator = n * sumXX - sumX * sumX;
    if (denominator === 0) return 0;
    return parseFloat(((n * sumXY - sumX * sumY) / denominator).toFixed(3));
  }, [points]);

  const intercept = useMemo(() => {
    if (points.length < 2) return 0;
    const n = points.length;
    let sumX = 0, sumY = 0, sumXX = 0, sumXY = 0;
    points.forEach((p) => {
      sumX  += p.x;
      sumY  += p.y;
      sumXY += p.x * p.y;
      sumXX += p.x * p.x;
    });
    const denominator = n * sumXX - sumX * sumX;
    if (denominator === 0) return 0;
    const m = (n * sumXY - sumX * sumY) / denominator;
    return parseFloat(((sumY - m * sumX) / n).toFixed(3));
  }, [points]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width   = canvas.width;
    const height  = canvas.height;
    const padding = 40;

    ctx.clearRect(0, 0, width, height);

    const plotWidth  = width  - padding * 2;
    const plotHeight = height - padding * 2;

    // Axes
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    const mapX = (x: number) => padding + (x / 5) * plotWidth;
    const mapY = (y: number) => height - padding - (y / 5) * plotHeight;

    // Grid subdivisions
    ctx.fillStyle = '#64748b';
    ctx.font = '9px monospace';
    for (let i = 1; i <= 5; i++) {
      const gridX = mapX(i);
      const gridY = mapY(i);

      ctx.strokeStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(gridX, padding);
      ctx.lineTo(gridX, height - padding + 4);
      ctx.stroke();
      ctx.fillText(i.toString(), gridX - 3, height - padding + 15);

      ctx.beginPath();
      ctx.moveTo(padding - 4, gridY);
      ctx.lineTo(width - padding, gridY);
      ctx.stroke();
      ctx.fillText(i.toString(), padding - 15, gridY + 3);
    }

    // Regression line
    if (points.length >= 2) {
      const startX = 0;
      const endX   = 5;
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth   = 2.5;
      ctx.beginPath();
      ctx.moveTo(mapX(startX), mapY(slope * startX + intercept));
      ctx.lineTo(mapX(endX),   mapY(slope * endX   + intercept));
      ctx.stroke();
    }

    // Data points
    points.forEach((p) => {
      const px = mapX(p.x);
      const py = mapY(p.y);

      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.35)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
    });

  }, [points, slope, intercept]);

  const addRandomPoint = () => {
    if (points.length >= 8) return;
    const newX = parseFloat((Math.random() * 4.5 + 0.5).toFixed(2));
    const newY = parseFloat((Math.random() * 4.5 + 0.5).toFixed(2));
    setPoints([...points, { x: newX, y: newY }]);
  };

  const clearPoints = () => setPoints([]);

  return (
    <div className="grid md:grid-cols-12 gap-8 items-start">

      {/* Parameters Panel */}
      <div className="md:col-span-7 bg-slate-950/30 border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-300">
              ORDINARY LEAST SQUARES
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">y = β₁x + β₀</span>
        </div>

        {/* Live equation */}
        <div className="bg-slate-950/70 rounded-2xl p-4 text-center border border-slate-800/50 flex justify-center items-center">
          <div className="font-mono text-xs md:text-sm text-slate-300 flex items-center">
            <span className="text-slate-500 font-serif mr-2">Model:</span>
            <span className="text-purple-400 font-bold">y =&nbsp;</span>
            <span className="text-amber-300">{slope}</span>
            <span className="text-slate-400">x</span>
            <span className="text-slate-400 mx-1">+</span>
            <span className="text-amber-300">{intercept}</span>
          </div>
        </div>

        {/* Coordinate list */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono text-slate-400 block tracking-widest uppercase">
            Active Coordinate Array
          </span>
          <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
            {points.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-2 flex justify-between items-center text-[11px] font-mono text-slate-300"
              >
                <span>P_{idx} = [{p.x}, {p.y}]</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={addRandomPoint}
            disabled={points.length >= 8}
            className="flex-1 py-2.5 rounded-xl text-xs font-mono border border-blue-500/30 hover:border-blue-500/50 bg-blue-950/20 text-blue-400 hover:text-blue-300 transition-all flex items-center justify-center gap-1.5 disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" /> ADD COORDINATE
          </button>
          <button
            onClick={clearPoints}
            className="py-2.5 px-4 rounded-xl text-xs font-mono border border-slate-800 hover:border-red-500/30 bg-slate-900/40 text-slate-400 hover:text-red-400 transition-all flex items-center justify-center"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas Frame */}
      <div className="md:col-span-5 bg-slate-950/20 border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-4">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
          STATISTICAL CURVE FITTER
        </span>
        <div className="flex justify-center bg-slate-950/65 rounded-2xl p-4 border border-slate-900">
          <canvas ref={canvasRef} width={280} height={280} className="rounded-lg" />
        </div>
        <p className="text-[11px] font-mono text-slate-400 leading-relaxed text-left">
          The regression curve mathematically minimises residual variances:
          <BlockMath tex="\sum_{i=1}^n e_i^2 = \sum_{i=1}^n (y_i - (\beta_1 x_i + \beta_0))^2" />
        </p>
      </div>

    </div>
  );
}