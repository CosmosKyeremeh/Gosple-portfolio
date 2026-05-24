'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { Trash2, RotateCcw, TrendingUp, Info } from 'lucide-react'

interface Point { x: number; y: number }
interface Stats {
  slope: number
  intercept: number
  r2: number
  n: number
  rse: number
}

function linearRegression(pts: Point[]): Stats | null {
  const n = pts.length
  if (n < 2) return null

  const sumX  = pts.reduce((s, p) => s + p.x, 0)
  const sumY  = pts.reduce((s, p) => s + p.y, 0)
  const sumXY = pts.reduce((s, p) => s + p.x * p.y, 0)
  const sumX2 = pts.reduce((s, p) => s + p.x * p.x, 0)

  const denom = n * sumX2 - sumX * sumX
  if (Math.abs(denom) < 1e-10) return null

  const slope     = (n * sumXY - sumX * sumY) / denom
  const intercept = (sumY - slope * sumX) / n

  const yMean  = sumY / n
  const ssTot  = pts.reduce((s, p) => s + (p.y - yMean) ** 2, 0)
  const ssRes  = pts.reduce((s, p) => s + (p.y - (slope * p.x + intercept)) ** 2, 0)
  const r2     = ssTot < 1e-10 ? 1 : 1 - ssRes / ssTot
  const rse    = n > 2 ? Math.sqrt(ssRes / (n - 2)) : 0

  return { slope, intercept, r2, n, rse }
}

const EXAMPLE_SETS = {
  'Strong Linear':   [[-3,-2.8],[-2,-1.9],[-1,-0.7],[0,0.3],[1,1.1],[2,2.2],[3,3.1],[4,4.0]],
  'Noisy Cloud':     [[-3,2],[-2,-1],[-1,3],[0,0],[1,-2],[2,3],[3,1],[-1,-3],[2,-1],[0,2]],
  'No Correlation':  [[-3,0],[-1,3],[0,-2],[1,1],[2,-3],[3,2],[4,0],[-2,-1]],
  'Negative Slope':  [[-3,4],[-2,3.1],[-1,1.8],[0,0.9],[1,-0.2],[2,-1.5],[3,-2.8]],
}

export default function RegressionPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [points,  setPoints]  = useState<Point[]>([])
  const [showLine, setShowLine] = useState(true)
  const [showInfo, setShowInfo] = useState(false)

  // OPTIMIZED: Replaced useState + useEffect with a single inline memoized selector
  const stats = useMemo(() => linearRegression(points), [points])

  // Map canvas px → math coords (range: -5 to 5 on each axis)
  const RANGE  = 5
  const toMath = useCallback((canvas: HTMLCanvasElement, px: number, py: number) => {
    const rect = canvas.getBoundingClientRect()
    const cx = px - rect.left
    const cy = py - rect.top
    const W  = canvas.offsetWidth
    const H  = canvas.offsetHeight
    return {
      x: ((cx / W) * 2 - 1) * RANGE,
      y: ((1 - cy / H) * 2 - 1) * RANGE,
    }
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const scaleX = W / (RANGE * 2)
    const scaleY = H / (RANGE * 2)

    const toCanvas = (mx: number, my: number) => ({
      x: cx + mx * scaleX,
      y: cy - my * scaleY,
    })

    ctx.clearRect(0, 0, W, H)

    // Grid
    ctx.strokeStyle = 'rgba(148,163,184,0.05)'
    ctx.lineWidth = 1
    for (let i = -RANGE; i <= RANGE; i++) {
      const cp = toCanvas(i, 0); ctx.beginPath(); ctx.moveTo(cp.x, 0); ctx.lineTo(cp.x, H); ctx.stroke()
      const rp = toCanvas(0, i); ctx.beginPath(); ctx.moveTo(0, rp.y); ctx.lineTo(W, rp.y); ctx.stroke()
    }

    // Axes
    ctx.strokeStyle = 'rgba(148,163,184,0.15)'
    ctx.lineWidth = 1.5
    const ox = toCanvas(0, 0)
    ctx.beginPath(); ctx.moveTo(ox.x, 0); ctx.lineTo(ox.x, H); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0, ox.y); ctx.lineTo(W, ox.y); ctx.stroke()

    // Axis tick labels
    ctx.fillStyle = 'rgba(148,163,184,0.2)'
    ctx.font = '9px monospace'
    ;[-4,-2,2,4].forEach(n => {
      const cp = toCanvas(n, 0); ctx.fillText(String(n), cp.x - 5, ox.y + 14)
      const rp = toCanvas(0, n); ctx.fillText(String(n), ox.x + 5, rp.y + 4)
    })

    // Regression line
    if (showLine && stats) {
      const x1 = -RANGE; const x2 = RANGE
      const y1 = stats.slope * x1 + stats.intercept
      const y2 = stats.slope * x2 + stats.intercept
      const c1 = toCanvas(x1, y1); const c2 = toCanvas(x2, y2)

      // Confidence band (rough visual ±1 RSE)
      const dy = stats.rse * scaleY
      ctx.fillStyle = 'rgba(59,130,246,0.05)'
      ctx.beginPath()
      ctx.moveTo(c1.x, c1.y - dy); ctx.lineTo(c2.x, c2.y - dy)
      ctx.lineTo(c2.x, c2.y + dy); ctx.lineTo(c1.x, c1.y + dy)
      ctx.closePath(); ctx.fill()

      // Residual lines
      points.forEach(p => {
        const predicted = stats.slope * p.x + stats.intercept
        const cp = toCanvas(p.x, p.y)
        const pp = toCanvas(p.x, predicted)
        ctx.strokeStyle = 'rgba(239,68,68,0.2)'
        ctx.lineWidth = 1
        ctx.setLineDash([3, 3])
        ctx.beginPath(); ctx.moveTo(cp.x, cp.y); ctx.lineTo(pp.x, pp.y); ctx.stroke()
        ctx.setLineDash([])
      })

      // Regression line
      const lineGrad = ctx.createLinearGradient(c1.x, c1.y, c2.x, c2.y)
      lineGrad.addColorStop(0, 'rgba(59,130,246,0.3)')
      lineGrad.addColorStop(0.5, 'rgba(59,130,246,0.9)')
      lineGrad.addColorStop(1, 'rgba(59,130,246,0.3)')
      ctx.strokeStyle = lineGrad
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(c1.x, c1.y); ctx.lineTo(c2.x, c2.y); ctx.stroke()
    }

    // Data points
    points.forEach(p => {
      const cp = toCanvas(p.x, p.y)
      const predicted = stats ? stats.slope * p.x + stats.intercept : null

      // Outer glow
      const grad = ctx.createRadialGradient(cp.x, cp.y, 0, cp.x, cp.y, 10)
      grad.addColorStop(0, 'rgba(168,85,247,0.35)')
      grad.addColorStop(1, 'rgba(168,85,247,0)')
      ctx.fillStyle = grad
      ctx.beginPath(); ctx.arc(cp.x, cp.y, 10, 0, Math.PI * 2); ctx.fill()

      // Point
      ctx.fillStyle = predicted !== null
        ? `rgba(168,85,247,${0.6 + 0.4 * (1 - Math.min(Math.abs(p.y - predicted), 4) / 4)})`
        : 'rgba(168,85,247,0.9)'
      ctx.beginPath(); ctx.arc(cp.x, cp.y, 5, 0, Math.PI * 2); ctx.fill()

      ctx.strokeStyle = 'rgba(196,181,253,0.6)'
      ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(cp.x, cp.y, 5, 0, Math.PI * 2); ctx.stroke()
    })

    // Empty state
    if (points.length === 0) {
      ctx.fillStyle = 'rgba(148,163,184,0.15)'
      ctx.font = '13px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('Click anywhere to add data points', W / 2, H / 2)
      ctx.font = '11px monospace'
      ctx.fillStyle = 'rgba(148,163,184,0.08)'
      ctx.fillText('Regression line appears after 2 points', W / 2, H / 2 + 22)
      ctx.textAlign = 'left'
    }

  }, [points, stats, showLine])

  useEffect(() => { draw() }, [draw])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const mp = toMath(canvas, e.clientX, e.clientY)

    // Remove nearby point if clicking close to it
    const snap = 0.4
    const idx = points.findIndex(p => Math.hypot(p.x - mp.x, p.y - mp.y) < snap)
    if (idx !== -1) {
      setPoints(prev => prev.filter((_, i) => i !== idx))
    } else {
      setPoints(prev => [...prev, { x: parseFloat(mp.x.toFixed(2)), y: parseFloat(mp.y.toFixed(2)) }])
    }
  }

  const loadExample = (key: keyof typeof EXAMPLE_SETS) => {
    setPoints(EXAMPLE_SETS[key].map(([x, y]) => ({ x, y })))
  }

  const r2Color = !stats ? '' : stats.r2 > 0.85 ? 'text-emerald-400' : stats.r2 > 0.5 ? 'text-amber-400' : 'text-red-400'

  return (
    <div className="relative min-h-screen math-coordinate-grid">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/4 blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-24">

        {/* Header */}
        <div className="mb-10 space-y-2">
          <p className="font-mono text-xs text-slate-600 uppercase tracking-widest">Interactive Lab · M4</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-100">
            Regression Workspace
          </h1>
          <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
            Click to place data points. The least-squares regression line and residuals update in real-time.
            Click an existing point to remove it.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Canvas */}
          <div className="lg:col-span-8">
            <div className="glass-panel-3d rounded-2xl border border-slate-800/40 overflow-hidden">
              <canvas
                ref={canvasRef}
                width={700}
                height={500}
                onClick={handleCanvasClick}
                className="w-full cursor-crosshair block"
                style={{ aspectRatio: '7/5' }}
              />
            </div>

            {/* Canvas controls strip */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setShowLine(v => !v)}
                  className={`w-9 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5 ${showLine ? 'bg-blue-500' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${showLine ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
                <span className="text-xs font-mono text-slate-500">Regression line</span>
              </label>
              <button
                onClick={() => setPoints([])}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-600 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear all
              </button>
            </div>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-4 space-y-4">

            {/* Stats */}
            <div className="glass-panel-3d rounded-2xl p-5 border border-slate-800/40 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800/50 pb-3">
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-mono font-bold text-slate-300 tracking-wider">REGRESSION STATS</span>
              </div>

              {!stats ? (
                <p className="text-xs font-mono text-slate-700 text-center py-4">
                  Add ≥ 2 points to see stats
                </p>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/30">
                    <span className="text-slate-600">n (sample size)</span>
                    <span className="text-slate-300 font-bold">{stats.n}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/30">
                    <span className="text-slate-600">slope (β₁)</span>
                    <span className="text-amber-300 font-bold">{stats.slope.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/30">
                    <span className="text-slate-600">intercept (β₀)</span>
                    <span className="text-amber-300 font-bold">{stats.intercept.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/30">
                    <span className="text-slate-600">R² (fit quality)</span>
                    <span className={`font-bold ${r2Color}`}>{stats.r2.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-600">RSE (std. error)</span>
                    <span className="text-slate-400 font-bold">{stats.rse.toFixed(4)}</span>
                  </div>

                  {/* R² bar */}
                  <div className="pt-2">
                    <div className="flex justify-between text-[10px] text-slate-700 mb-1">
                      <span>R² = 0</span>
                      <span className={r2Color}>{(stats.r2 * 100).toFixed(1)}% variance explained</span>
                      <span>R² = 1</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          stats.r2 > 0.85 ? 'bg-emerald-500' : stats.r2 > 0.5 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.max(0, Math.min(1, stats.r2)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Equation */}
                  <div className="mt-3 bg-slate-950/60 rounded-xl p-3 border border-slate-800/40 text-center">
                    <p className="text-[10px] text-slate-600 mb-1">Fitted equation</p>
                    <p className="text-blue-300">
                      ŷ = {stats.slope >= 0 ? '' : '−'}{Math.abs(stats.slope).toFixed(3)}x{' '}
                      {stats.intercept >= 0 ? '+' : '−'}{' '}
                      {Math.abs(stats.intercept).toFixed(3)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Example datasets */}
            <div className="glass-panel-3d rounded-2xl p-5 border border-slate-800/40 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800/50 pb-3">
                <RotateCcw className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-mono font-bold text-slate-300 tracking-wider">EXAMPLE DATASETS</span>
              </div>
              <div className="space-y-2">
                {(Object.keys(EXAMPLE_SETS) as (keyof typeof EXAMPLE_SETS)[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => loadExample(key)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-slate-500 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent hover:border-slate-700/40 transition-all"
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {/* Math context */}
            <button
              onClick={() => setShowInfo(v => !v)}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-800/40 text-xs font-mono text-slate-600 hover:text-slate-300 hover:border-slate-700 transition-all"
            >
              <Info className="w-3.5 h-3.5" />
              {showInfo ? 'Hide' : 'Show'} derivation
            </button>

            {showInfo && (
              <div className="glass-panel-3d rounded-2xl p-5 border border-slate-800/40 text-[11px] font-mono text-slate-500 space-y-2 leading-relaxed">
                <p className="text-slate-400 font-bold">Least Squares Solution</p>
                <p>Minimise: Σ(yᵢ − ŷᵢ)² = ‖y − Xβ‖²</p>
                <p>Normal equations: XᵀXβ = Xᵀy</p>
                <p>Solution: β̂ = (XᵀX)⁻¹Xᵀy</p>
                <p className="text-slate-400 font-bold pt-1">R² Interpretation</p>
                <p>R² = 1 − SSᵣₑₛ / SSₜₒₜ</p>
                <p>Proportion of variance explained by the linear model.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}