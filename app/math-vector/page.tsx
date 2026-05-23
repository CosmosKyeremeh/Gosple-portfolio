'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

export default function MathVectorPage() {
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
    const scale = 32; // Scale projection factor

    ctx.clearRect(0, 0, width, height);

    // Coordinate auxiliary sub-grid lines
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

    // Origin coordinate frames
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Reference square coordinates
    const originalPoints = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ];

    // Transformation evaluation: T(x, y) = [ax + by, cx + dy]
    const transform = (p: { x: number; y: number }) => ({
      x: matrix.a * p.x + matrix.b * p.y,
      y: matrix.c * p.x + matrix.d * p.y,
    });

    const transformedPoints = originalPoints.map(transform);

    // Draw reference square outline
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX + originalPoints[0].x * scale, centerY - originalPoints[0].y * scale);
    originalPoints.forEach((p) => {
      ctx.lineTo(centerX + p.x * scale, centerY - p.y * scale);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Draw transformed projection space
    const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, width / 2);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.45)');
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

    // Basis transformations vectors (i' and j')
    const iTransformed = transform({ x: 1, y: 0 });
    const jTransformed = transform({ x: 0, y: 1 });

    // i' Vector
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + iTransformed.x * scale, centerY - iTransformed.y * scale);
    ctx.stroke();

    // j' Vector
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + jTransformed.x * scale, centerY - jTransformed.y * scale);
    ctx.stroke();

    // Vector labeling
    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 10px monospace';
    ctx.fillText("i'", centerX + iTransformed.x * scale + 6, centerY - iTransformed.y * scale - 6);

    ctx.fillStyle = '#10b981';
    ctx.fillText("j'", centerX + jTransformed.x * scale + 6, centerY - jTransformed.y * scale - 6);

  }, [matrix]);

  return (
    <div className="relative min-h-screen bg-[#070913] text-slate-100 font-sans selection:bg-purple-500/30 overflow-x-hidden math-coordinate-grid">
      {/* Navbar removed: inherited from layout.tsx */}
      <main className="max-w-5xl mx-auto px-4 pt-28 pb-24 relative z-10">
        <div className="py-8 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-serif text-slate-100">Vector Space Transformation Simulator</h2>
            <p className="text-slate-400 text-xs">
              Apply matrix operators directly in real-time to visualize multidimensional shear and scaling bounds.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Control Panel Block */}
            <div className="md:col-span-7 bg-slate-950/30 border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-300">MATRIX OPERATOR VALUES</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Av = λv</span>
              </div>

              {/* Matrix display */}
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

              {/* Interactive sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span>Basis Vector i' x-stretch (a)</span>
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
                    <span>Basis Vector i' y-shear (c)</span>
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
                    <span>Basis Vector j' x-shear (b)</span>
                    <span className="text-green-400 font-bold">{matrix.b}</span>
                  </div>
                  <input 
                    type="range" min="-3" max="3" step="0.1" value={matrix.b} 
                    onChange={(e) => setMatrix({ ...matrix, b: parseFloat(e.target.value) })}
                    className="w-full accent-green-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span>Basis Vector j' y-stretch (d)</span>
                    <span className="text-green-400 font-bold">{matrix.d}</span>
                  </div>
                  <input 
                    type="range" min="-3" max="3" step="0.1" value={matrix.d} 
                    onChange={(e) => setMatrix({ ...matrix, d: parseFloat(e.target.value) })}
                    className="w-full accent-green-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setMatrix({ a: 1, b: 0, c: 0, d: 1 })}
                  className="flex-1 py-2.5 rounded-xl text-xs font-mono border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-slate-300 hover:text-white transition-all"
                >
                  RESET IDENTITY [I]
                </button>
              </div>
            </div>

            {/* Matrix Coordinate Output Canvas */}
            <div className="md:col-span-5 bg-slate-950/20 border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-4 text-left">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">TRANSFORM VISUALIZATION GRAPH</span>
              <div className="flex justify-center bg-slate-950/65 rounded-2xl p-4 border border-slate-900">
                <canvas ref={canvasRef} width={280} height={280} className="rounded-lg" />
              </div>
              <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                The dashed line represents the vector identity square grid. The glowing blue canvas shape represents the space multiplied by matrix <span className="text-blue-400 font-bold">A</span>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}