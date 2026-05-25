'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal, RefreshCw } from 'lucide-react';

export default function VectorSpace() {
  const [matrix, setMatrix] = useState({ a: 1, b: 0, c: 0, d: 1 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 32; // Scale factor: pixels per math coordinate unit

    ctx.clearRect(0, 0, width, height);

    // Coordinate grid spacing lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    for (let x = -width / 2; x < width / 2; x += scale) {
      ctx.beginPath();
      ctx.moveTo(centerX + x, 0);
      ctx.lineTo(centerX + x, height);
      ctx.stroke();
    }
    for (let y = -height / 2; y < height / 2; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, centerY + y);
      ctx.lineTo(width, centerY + y);
      ctx.stroke();
    }

    // Origin axis lines
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Standard reference square coords
    const referenceSquare = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ];

    // Vector Multiplier Transformation: T(v) = Mv
    const transform = (v: { x: number; y: number }) => ({
      x: matrix.a * v.x + matrix.b * v.y,
      y: matrix.c * v.x + matrix.d * v.y,
    });

    const transformedPoints = referenceSquare.map(transform);

    // Draw reference original shape
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX + referenceSquare[0].x * scale, centerY - referenceSquare[0].y * scale);
    referenceSquare.forEach((p) => {
      ctx.lineTo(centerX + p.x * scale, centerY - p.y * scale);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dashes

    // Render morphed vector space
    const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, width / 2);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    gradient.addColorStop(1, 'rgba(168, 85, 247, 0.05)');

    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(centerX + transformedPoints[0].x * scale, centerY - transformedPoints[0].y * scale);
    transformedPoints.forEach((p) => {
      ctx.lineTo(centerX + p.x * scale, centerY - p.y * scale);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Transformed bases
    const iTransformed = transform({ x: 1, y: 0 });
    const jTransformed = transform({ x: 0, y: 1 });

    // Draw Basis i' Vector
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + iTransformed.x * scale, centerY - iTransformed.y * scale);
    ctx.stroke();

    // Draw Basis j' Vector
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + jTransformed.x * scale, centerY - jTransformed.y * scale);
    ctx.stroke();

    // Text labels
    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 10px monospace';
    ctx.fillText("i'", centerX + iTransformed.x * scale + 6, centerY - iTransformed.y * scale - 6);

    ctx.fillStyle = '#10b981';
    ctx.fillText("j'", centerX + jTransformed.x * scale + 6, centerY - jTransformed.y * scale - 6);

  }, [matrix]);

  return (
    <div className="grid md:grid-cols-12 gap-8 items-start">
      {/* Interactive Sliders Form */}
      <div className="md:col-span-7 bg-slate-950/30 border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-300">TRANSFORMATION SYSTEM</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Mv = v'</span>
        </div>

        {/* Real-time Math Display */}
        <div className="bg-slate-950/70 rounded-2xl p-4 text-center border border-slate-800/50 flex justify-center items-center">
          <div className="font-mono text-xs md:text-sm text-slate-300 space-x-1 flex items-center">
            <span className="text-slate-500 font-serif mr-2">T(x,y) =</span>
            <span className="text-slate-400 mr-1">[</span>
            <span className="text-amber-300">{matrix.a}x + {matrix.b}y</span>
            <span className="text-slate-400 mx-1">,</span>
            <span className="text-amber-300">{matrix.c}x + {matrix.d}y</span>
            <span className="text-slate-400 ml-1">]</span>
          </div>
        </div>

        {/* Input Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
              <span>Basis i' Horizontal Scalar (a)</span>
              <span className="text-blue-400 font-bold">{matrix.a}</span>
            </div>
            <input 
              type="range" min="-3" max="3" step="0.1" value={matrix.a} 
              onChange={(e) => setMatrix({ ...matrix, a: parseFloat(e.target.value) })}
              className="w-full accent-blue-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
              <span>Basis i' Vertical Shear (c)</span>
              <span className="text-blue-400 font-bold">{matrix.c}</span>
            </div>
            <input 
              type="range" min="-3" max="3" step="0.1" value={matrix.c} 
              onChange={(e) => setMatrix({ ...matrix, c: parseFloat(e.target.value) })}
              className="w-full accent-blue-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
              <span>Basis j' Horizontal Shear (b)</span>
              <span className="text-emerald-400 font-bold">{matrix.b}</span>
            </div>
            <input 
              type="range" min="-3" max="3" step="0.1" value={matrix.b} 
              onChange={(e) => setMatrix({ ...matrix, b: parseFloat(e.target.value) })}
              className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
              <span>Basis j' Vertical Scalar (d)</span>
              <span className="text-emerald-400 font-bold">{matrix.d}</span>
            </div>
            <input 
              type="range" min="-3" max="3" step="0.1" value={matrix.d} 
              onChange={(e) => setMatrix({ ...matrix, d: parseFloat(e.target.value) })}
              className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <button 
          onClick={() => setMatrix({ a: 1, b: 0, c: 0, d: 1 })}
          className="w-full py-2.5 rounded-xl text-xs font-mono border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> RESET IDENTITY MATRIX
        </button>
      </div>

      {/* Render Canvas Graphic */}
      <div className="md:col-span-5 bg-slate-950/20 border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-4">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">VECTOR MAPPING COORDINATES</span>
        <div className="flex justify-center bg-slate-950/65 rounded-2xl p-4 border border-slate-900">
          <canvas ref={canvasRef} width={280} height={280} className="rounded-lg" />
        </div>
        <p className="text-[11px] font-mono text-slate-400 leading-relaxed text-left">
          The dashed grid square indicates standard coordinates. The glowing vector field projects the altered space calculated by matrix multiplication.
        </p>
      </div>
    </div>
  );
}