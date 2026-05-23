'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Home, User, Folder, BookOpen, Sigma } from 'lucide-react'

const links = [
  { href: '/',            label: 'Home',     icon: Home },
  { href: '/about',       label: 'About',    icon: User },
  { href: '/projects',    label: 'Projects', icon: Folder },
  { href: '/blog',        label: 'Insights', icon: BookOpen },
  { href: '/math-vector', label: 'Lab',      icon: Sigma },
]

export default function Navbar() {
  const pathname = usePathname()
  const [imgError, setImgError] = useState(false)

  return (
    <>
      {/* 1. Profile Avatar Container (Absolute Top - Scrolls with Page) */}
      <div className="absolute top-6 left-0 right-0 z-40 px-4 pointer-events-none">
        <div className="max-w-5xl mx-auto w-full flex justify-start">
          <Link 
            href="/" 
            className="pointer-events-auto block relative group rounded-full p-0.5 bg-slate-950/60 border border-slate-800/40 backdrop-blur-md hover:border-slate-700 transition-all duration-300 shadow-xl flex-shrink-0"
          >
            {/* Flex-shrink-0 ensures the container layout never compresses */}
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-950/80 flex items-center justify-center bg-slate-900 flex-shrink-0">
              {!imgError ? (
                <Image
                  src="/profile.jpeg"
                  alt="Profile Avatar"
                  width={36}  
                  height={36}
                  priority
                  onError={() => setImgError(true)}
                  className="object-cover w-full h-full rounded-full group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                /* Rose Fallback State */
                <div className="absolute inset-0 bg-rose-500 flex items-center justify-center text-slate-50 font-mono text-xs font-bold tracking-tighter group-hover:bg-rose-600 transition-colors duration-300">
                  F.A.G
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* 2. Navigation Menu (Fixed Floating Tablet Panel) */}
      <nav className="fixed bottom-6 top-auto md:top-6 md:bottom-auto left-0 right-0 z-50 px-4 transition-all duration-300 pointer-events-none">
        <div className="max-w-5xl mx-auto w-full flex justify-center md:justify-end">
          <div className="pointer-events-auto bg-slate-950/80 backdrop-blur-xl border border-slate-800/60 rounded-full p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.02)] flex items-center gap-1 w-full md:w-max justify-around md:justify-end">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href

              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 rounded-full font-mono text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-slate-100 px-4 py-2 border border-slate-800/60 shadow-inner'
                      : 'text-slate-500 hover:text-slate-200 px-3 py-2'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : ''}`} />
                  <span
                    className={`transition-all duration-150 ${
                      isActive 
                        ? 'block' 
                        : 'hidden md:block'
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}