# =========================================================================
# GOSPLE PORTFOLIO - MILESTONE COMPLETION & REPAIR SCRIPT
# Uses native .NET File System to bypass PowerShell wildcard brackets [slug]
# =========================================================================

Write-Host "Initializing Core Frame & Page Compilation..." -ForegroundColor Cyan

# Ensure missing directory structures exist
$directories = @(
    "app/math-vector"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
        Write-Host "Created Directory: $dir" -ForegroundColor Green
    }
}

# Foolproof .NET File Writer to avoid [bracket] wildcard errors
function Write-SecureFile($filePath, $content) {
    # Resolve absolute path to prevent folder mapping discrepancies
    $absolutePath = [System.IO.Path]::GetFullPath($filePath)
    [System.IO.File]::WriteAllText($absolutePath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Successfully Compiled: $filePath" -ForegroundColor Green
}

# =========================================================================
# 1. REPAIR: Project Dynamic Route [slug] Renderer
# =========================================================================
$projectSlugCode = @'
import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getFileBySlug, getFiles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = await getFiles('projects');
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectSlugPage({ params }: PageProps) {
  const project = await getFileBySlug('projects', params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-[#070913] text-slate-100 font-sans selection:bg-purple-500/30 overflow-x-hidden math-coordinate-grid">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pb-24 relative z-10">
        <article className="prose prose-invert max-w-none glass-panel-3d rounded-3xl p-8 md:p-12 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-6">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-2">
              {project.metadata.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-extrabold text-slate-100 tracking-tight leading-tight">
              {project.metadata.title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-4 text-xs font-mono text-slate-500">
              <span>Published: {project.metadata.date}</span>
              <span>•</span>
              <div className="flex gap-1.5">
                {project.metadata.tags.map((tag, idx) => (
                  <span key={idx} className="text-purple-400">#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-slate-300 leading-relaxed mdx-content">
            <MDXRemote 
              source={project.content} 
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMath],
                  rehypePlugins: [rehypeKatex],
                }
              }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
'@

Write-SecureFile "app/projects/[slug]/page.tsx" $projectSlugCode

# =========================================================================
# 2. REPAIR: Blog Dynamic Route [slug] Renderer
# =========================================================================
$blogSlugCode = @'
import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getFileBySlug, getFiles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const blogs = await getFiles('blog');
  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

export default async function BlogSlugPage({ params }: PageProps) {
  const post = await getFileBySlug('blog', params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-[#070913] text-slate-100 font-sans selection:bg-purple-500/30 overflow-x-hidden math-coordinate-grid">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pb-24 relative z-10">
        <article className="prose prose-invert max-w-none glass-panel-3d rounded-3xl p-8 md:p-12 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-6">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-2">
              {post.metadata.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-extrabold text-slate-100 tracking-tight leading-tight">
              {post.metadata.title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-4 text-xs font-mono text-slate-500">
              <span>Date: {post.metadata.date}</span>
              <span>•</span>
              <div className="flex gap-1.5">
                {post.metadata.tags.map((tag, idx) => (
                  <span key={idx} className="text-blue-400">#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-slate-300 leading-relaxed mdx-content">
            <MDXRemote 
              source={post.content} 
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMath],
                  rehypePlugins: [rehypeKatex],
                }
              }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
'@

Write-SecureFile "app/blog/[slug]/page.tsx" $blogSlugCode

# =========================================================================
# 3. COMPILATION: Root Master Layout
# =========================================================================
$layoutCode = @'
import '@/app/globals.css';

export const metadata = {
  title: 'Gosple Portfolio — CS & Mathematics',
  description: 'Proof of Thought — Exploring computational algorithms and discrete topological structures.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-[#070913] text-slate-100 antialiased font-sans min-h-screen relative selection:bg-purple-500/30">
        {children}
      </body>
    </html>
  );
}
'@

Write-SecureFile "app/layout.tsx" $layoutCode

# =========================================================================
# 4. COMPILATION: High-Fidelity Landing Page
# =========================================================================
$landingPageCode = @'
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getFiles } from '@/lib/mdx';
import { Cpu, Layers, Binary, ArrowRight, Sparkles } from 'lucide-react';

export default async function Page() {
  const projects = await getFiles('projects');
  const blogs = await getFiles('blog');

  return (
    <div className="relative min-h-screen bg-[#070913] text-slate-100 font-sans overflow-x-hidden math-coordinate-grid">
      {/* Background radial gradient layers */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 pb-24 relative z-10">
        <div className="space-y-16 py-8">
          {/* Hero segment */}
          <div className="space-y-6 pt-12 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-purple-950/30 border border-purple-500/20 text-purple-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>MILTON COGNITIVE ENGINE SECURE & ACTIVE</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-extrabold font-serif tracking-tight leading-tight">
              Proof of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-amber-300">Thought.</span>
            </h1>
            
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-sans">
              Hi, I'm <span className="text-slate-100 font-semibold font-serif">Gosple</span>. A Computer Science & Engineering student viewing computing through the elegant lens of mathematics, proof systems, and numerical method dynamics.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link 
                href="/math-vector"
                className="relative px-6 py-3 rounded-full text-xs font-mono tracking-wider text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_4px_30px_rgba(59,130,246,0.55)] transition-all duration-300 transform hover:-translate-y-0.5 font-bold flex items-center justify-center gap-1.5"
              >
                TRANSFORM VECTOR SPACE <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link 
                href="/projects"
                className="relative px-6 py-3 rounded-full text-xs font-mono tracking-wider font-semibold text-slate-300 bg-slate-900/50 hover:text-white border border-slate-800 backdrop-blur-md hover:border-slate-600 transition-all duration-300 flex items-center justify-center"
              >
                EXPLORE WRITE-UPS
              </Link>
            </div>
          </div>

          {/* Tri-core value pillars */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            {[
              {
                title: "Mathematical Rigour",
                desc: "Algorithms aren't arbitrary templates. They are structural proofs in action. I analyze worst-case limits via clean asymptotes.",
                icon: Binary,
                color: "from-blue-500 to-cyan-400"
              },
              {
                title: "Static MDX Portability",
                desc: "No bulky database layouts or slow servers. All technical projects and blog notes compile statically at build-time with LaTeX support.",
                icon: Layers,
                color: "from-purple-500 to-indigo-400"
              },
              {
                title: "WASM & Client Engines",
                desc: "Calculating dimensional vector projections, path integrations, and regressions directly in the user's browser with fast microsecond response times.",
                icon: Cpu,
                color: "from-amber-500 to-orange-400"
              }
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <div 
                  key={i} 
                  className="backdrop-blur-md bg-slate-900/10 hover:bg-slate-900/20 border border-slate-800/60 hover:border-slate-700/60 rounded-2xl p-6 shadow-lg transition-all duration-300 group hover:-translate-y-1 text-left"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${value.color} flex items-center justify-center text-slate-950 font-bold mb-4 shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-serif mb-2 text-slate-200">{value.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Real-time Project List compiled from MDX */}
          <div className="space-y-6 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-serif text-slate-100">Analytical Research Projects</h2>
                <p className="text-slate-400 text-xs">Exemplifying mathematics applied directly to computational algorithms.</p>
              </div>
              <Link href="/projects" className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1">
                See All Project Log <ChevronRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.slice(0, 2).map((project) => (
                <Link 
                  href={`/projects/${project.slug}`}
                  key={project.slug}
                  className="glass-panel-3d rounded-2xl p-6 flex flex-col justify-between h-64 text-left cursor-pointer group"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-wider text-blue-400 px-2.5 py-1 rounded-full bg-blue-950/40 border border-blue-900/50">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between font-mono text-[10px] text-purple-400">
                    <span>COMPILE BOUND:</span>
                    <code className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-amber-300">
                      date: {project.date}
                    </code>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
'@

Write-SecureFile "app/page.tsx" $landingPageCode

# =========================================================================
# 5. COMPILATION: Client-Side Interactive Vector Space Visualizer
# =========================================================================
$vectorPlaygroundCode = @'
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Terminal, Binary } from 'lucide-react';

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
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pb-24 relative z-10">
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
      <Footer />
    </div>
  );
}
'@

Write-SecureFile "app/math-vector/page.tsx" $vectorPlaygroundCode

Write-Host "`nMilestones 1 & 2 fully compiled with zero wildcard issues!" -ForegroundColor Green
Write-Host "You are now ready to run: npm run dev" -ForegroundColor Cyan