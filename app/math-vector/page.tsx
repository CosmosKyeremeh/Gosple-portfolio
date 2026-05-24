'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Terminal, RotateCcw, Info } from 'lucide-react'

interface Matrix { a: number; b: number; c: number; d: number }

const PRESETS: { label: string; m: Matrix; desc: string }[] = [
  { label: 'Identity',    m: { a: 1, b: 0, c: 0, d: 1  }, desc: 'No transformation. Every vector maps to itself.' },
  { label: 'Rotate 90°',  m: { a: 0, b: -1, c: 1, d: 0 }, desc: 'Rotates every vector 90° counter-clockwise.'    },
  { label: 'Scale ×2',    m: { a: 2, b: 0, c: 0, d: 2  }, desc: 'Uniform scaling — doubles all vector lengths.'   },
  { label: 'Shear X',     m: { a: 1, b: 1, c: 0, d: 1  }, desc: 'Horizontal shear. Columns remain parallel.'     },
  { label: 'Reflect Y',   m: { a: -1, b: 0, c: 0, d: 1 }, desc: 'Reflection across the y-axis.'                  },
]

function det(m: Matrix) { return m.a * m.d - m.b * m.c }

export default function MathVectorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [matrix, setMatrix]   = useState<Matrix>({ a: 1, b: 0, c: 0, d: 1 })
  const [activePreset, setActivePreset] = useState<string>('Identity')
  const [showInfo, setShowInfo] = useState(false)

  const determinant = det(matrix)

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const scale = 55

    ctx.clearRect(0, 0, W, H)

    // ── Grid ──────────────────────────────────────
    ctx.strokeStyle = 'rgba(148,163,184,0.06)'
    ctx.lineWidth = 1
    for (let i = -5; i <= 5; i++) {
      ctx.beginPath(); ctx.moveTo(cx + i * scale, 0); ctx.lineTo(cx + i * scale, H); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, cy + i * scale); ctx.lineTo(W, cy + i * scale); ctx.stroke()
    }

    // ── Axes ──────────────────────────────────────
    ctx.strokeStyle = 'rgba(148,163,184,0.2)'
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke()

    // ── Axis labels ───────────────────────────────
    ctx.fillStyle = 'rgba(148,163,184,0.25)'
    ctx.font = '9px monospace'
    ;[-3,-2,-1,1,2,3].forEach(n => {
      ctx.fillText(String(n), cx + n * scale - 6, cy + 14)
      if (n !== 0) ctx.fillText(String(-n), cx + 4, cy - n * scale + 4)
    })

    const transform = (p: { x: number; y: number }) => ({
      x: matrix.a * p.x + matrix.b * p.y,
      y: matrix.c * p.x + matrix.d * p.y,
    })

    const toCanvas = (p: { x: number; y: number }) => ({
      x: cx + p.x * scale,
      y: cy - p.y * scale,
    })

    // ── Original unit square (dashed) ─────────────
    const orig = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
    ctx.setLineDash([4, 4])
    ctx.strokeStyle = 'rgba(148,163,184,0.22)'
    ctx.lineWidth = 1
    ctx.beginPath()
    orig.forEach((p, i) => {
      const c = toCanvas(p)
      i === 0 ? ctx.moveTo(c.x, c.y) : ctx.lineTo(c.x, c.y)
    })
    ctx.closePath()
    ctx.stroke()
    ctx.setLineDash([])

    // ── Transformed square (filled) ───────────────
    const tfm = orig.map(transform)
    const absdet = Math.abs(determinant)
    const isCollapsed = absdet < 0.01

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160)
    grad.addColorStop(0, 'rgba(59,130,246,0.35)')
    grad.addColorStop(1, 'rgba(168,85,247,0.08)')

    ctx.fillStyle = isCollapsed ? 'rgba(239,68,68,0.12)' : grad
    ctx.strokeStyle = isCollapsed ? '#ef4444' : '#3b82f6'
    ctx.lineWidth = 2
    ctx.beginPath()
    tfm.forEach((p, i) => {
      const c = toCanvas(p)
      i === 0 ? ctx.moveTo(c.x, c.y) : ctx.lineTo(c.x, c.y)
    })
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // ── Basis vectors ─────────────────────────────
    const drawArrow = (to: { x: number; y: number }, color: string, label: string) => {
      const origin = toCanvas({ x: 0, y: 0 })
      const target = toCanvas(to)
      const dx = target.x - origin.x
      const dy = target.y - origin.y
      const len = Math.sqrt(dx * dx + dy * dy)
      if (len < 2) return

      const ux = dx / len; const uy = dy / len
      const hw = 7; const hl = 13

      ctx.strokeStyle = color; ctx.lineWidth = 2.5
      ctx.beginPath(); ctx.moveTo(origin.x, origin.y)
      ctx.lineTo(target.x - ux * hl, target.y - uy * hl)
      ctx.stroke()

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(target.x, target.y)
      ctx.lineTo(target.x - ux * hl - uy * hw, target.y - uy * hl + ux * hw)
      ctx.lineTo(target.x - ux * hl + uy * hw, target.y - uy * hl - ux * hw)
      ctx.closePath(); ctx.fill()

      ctx.font = 'bold 10px monospace'
      ctx.fillStyle = color
      ctx.fillText(label, target.x + 6, target.y - 6)
    }

    const i_prime = transform({ x: 1, y: 0 })
    const j_prime = transform({ x: 0, y: 1 })
    drawArrow(i_prime, '#f43f5e', "î'")
    drawArrow(j_prime, '#10b981', "ĵ'")

  }, [matrix, determinant])

  useEffect(() => { drawCanvas() }, [drawCanvas])

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setMatrix(preset.m)
    setActivePreset(preset.label)
  }

  const sliders: { key: keyof Matrix; label: string; color: string }[] = [
    { key: 'a', label: 'a  — î x-stretch', color: 'accent-rose-500'    },
    { key: 'c', label: 'c  — î y-shear',   color: 'accent-rose-400'    },
    { key: 'b', label: 'b  — ĵ x-shear',  color: 'accent-emerald-500' },
    { key: 'd', label: 'd  — ĵ y-stretch', color: 'accent-emerald-400' },
  ]

  return (
    <div className="relative min-h-screen math-coordinate-grid">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/4 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-violet-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-24">

        {/* Header */}
        <div className="mb-10 space-y-2">
          <p className="font-mono text-xs text-slate-600 uppercase tracking-widest">Interactive Lab · M3</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-100">
            Vector Space Transformer
          </h1>
          <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
            Apply a 2×2 linear transformation and watch the basis vectors and unit square deform in real-time.
            Observe how determinant sign correlates with orientation reversal.
          </p>
        </div>

        {/* Math equation strip */}
        <div className="mb-8 glass-panel-3d rounded-xl px-5 py-3 border border-slate-800/40 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
          <span className="text-slate-600">T(x, y) =</span>
          <span>
            <span className="text-amber-300">[{matrix.a}x + {matrix.b}y</span>
            <span className="text-slate-600">,  </span>
            <span className="text-amber-300">{matrix.c}x + {matrix.d}y]</span>
          </span>
          <span className="text-slate-700">·</span>
          <span className={`font-bold ${Math.abs(determinant) < 0.01 ? 'text-red-400' : determinant < 0 ? 'text-violet-400' : 'text-blue-400'}`}>
            det(A) = {determinant.toFixed(2)}
            {Math.abs(determinant) < 0.01 && ' ← collapsed!'}
            {determinant < -0.01 && ' ← orientation flipped'}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: controls */}
          <div className="lg:col-span-5 space-y-5">

            {/* Presets */}
            <div className="glass-panel-3d rounded-2xl p-5 border border-slate-800/40 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800/50 pb-3">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-mono font-bold text-slate-300 tracking-wider">PRESETS</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => applyPreset(p)}
                    className={`text-left px-3 py-2.5 rounded-xl text-xs font-mono transition-all duration-150 border ${
                      activePreset === p.label
                        ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                        : 'bg-slate-900/40 border-slate-800/40 text-slate-500 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {activePreset && (
                <p className="text-[11px] text-slate-600 font-mono leading-relaxed">
                  {PRESETS.find(p => p.label === activePreset)?.desc}
                </p>
              )}
            </div>

            {/* Sliders */}
            <div className="glass-panel-3d rounded-2xl p-5 border border-slate-800/40 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800/50 pb-3">
                <span className="text-xs font-mono font-bold text-slate-300 tracking-wider">MATRIX CONTROLS</span>
                <button
                  onClick={() => { setMatrix({ a: 1, b: 0, c: 0, d: 1 }); setActivePreset('Identity') }}
                  className="flex items-center gap-1.5 text-[10px] font-mono text-slate-600 hover:text-slate-300 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> RESET
                </button>
              </div>

              {/* 2×2 matrix visual */}
              <div className="flex justify-center py-1">
                <div className="font-mono text-sm text-slate-300 inline-grid grid-cols-[auto_auto_auto_auto_auto] gap-x-2 items-center">
                  <span className="text-slate-600 text-lg font-light row-span-2">⌈</span>
                  <span className="text-rose-400 text-center">{matrix.a}</span>
                  <span className="text-slate-600 text-center px-1">·</span>
                  <span className="text-emerald-400 text-center">{matrix.b}</span>
                  <span className="text-slate-600 text-lg font-light row-span-2">⌉</span>
                  <span className="text-rose-400 text-center">{matrix.c}</span>
                  <span className="text-slate-600 text-center px-1">·</span>
                  <span className="text-emerald-400 text-center">{matrix.d}</span>
                </div>
              </div>

              <div className="space-y-4">
                {sliders.map(({ key, label, color }) => (
                  <div key={key}>
                    <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1.5">
                      <span>{label}</span>
                      <span className={key === 'a' || key === 'c' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {matrix[key].toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range" min="-3" max="3" step="0.05"
                      value={matrix[key]}
                      onChange={(e) => {
                        setActivePreset('')
                        setMatrix(prev => ({ ...prev, [key]: parseFloat(e.target.value) }))
                      }}
                      className={`w-full ${color} h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-800/40 text-xs font-mono text-slate-600 hover:text-slate-300 hover:border-slate-700 transition-all"
            >
              <Info className="w-3.5 h-3.5" />
              {showInfo ? 'Hide' : 'Show'} mathematical context
            </button>

            {showInfo && (
              <div className="glass-panel-3d rounded-2xl p-5 border border-slate-800/40 text-xs font-mono text-slate-500 space-y-3 leading-relaxed">
                <p><span className="text-rose-400">î' = (a, c)</span> — where the x-basis vector lands</p>
                <p><span className="text-emerald-400">ĵ' = (b, d)</span> — where the y-basis vector lands</p>
                <p><span className="text-blue-400">det(A) = ad − bc</span> — area scaling factor</p>
                <p>det = 0 → matrix is singular, space collapses to a line</p>
                <p>det &lt; 0 → orientation is reversed (reflected)</p>
              </div>
            )}
          </div>

          {/* Right: canvas */}
          <div className="lg:col-span-7">
            <div className="glass-panel-3d rounded-2xl p-5 border border-slate-800/40 space-y-3 h-full">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">TRANSFORMATION CANVAS</span>
                <div className="flex items-center gap-4 text-[10px] font-mono text-slate-700">
                  <span><span className="text-slate-500 mr-1">──</span>original</span>
                  <span><span className="text-blue-400 mr-1">──</span>transformed</span>
                  <span><span className="text-rose-400 mr-1">→</span>î'</span>
                  <span><span className="text-emerald-400 mr-1">→</span>ĵ'</span>
                </div>
              </div>
              <div className="flex justify-center bg-slate-950/60 rounded-xl p-2 border border-slate-900/60">
                <canvas
                  ref={canvasRef}
                  width={460}
                  height={420}
                  className="rounded-lg w-full max-w-[460px]"
                />
              </div>
              <p className="text-[11px] font-mono text-slate-700 leading-relaxed text-center">
                Drag sliders — the blue shape is the image of the unit square under A
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}