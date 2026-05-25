import Link from 'next/link'
import { Mail, Sigma } from 'lucide-react'

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/CosmosKyeremeh/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    hoverClass: 'hover:text-slate-200 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]'
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/233599489508',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    hoverClass: 'hover:text-emerald-400 hover:drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]'
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/17YExqN5F9/?mibextid=wwXIfr',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    hoverClass: 'hover:text-blue-400 hover:drop-shadow-[0_0_6px_rgba(96,165,250,0.3)]'
  },
  {
    name: 'Snapchat',
    href: 'https://www.snapchat.com/add/bongr8_02',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c2.154 0 4 1.482 4 4v1c0 .723.364 1.348 1 1.5.83.2 1.5.5 1.5 1.5s-.67 1.5-1.5 1.5c0 .5-.3 2.5-1.5 3.5-.5.417-1.25.5-2.5 0-.5.417-1.25.5-2.5.5s-2-.083-2.5-.5c-1.25.5-2 .417-2.5 0-1.2-1-1.5-3-1.5-3.5-.83 0-1.5-.5-1.5-1.5s.67-1.3 1.5-1.5c.636-.152 1-.777 1-1.5V6c0-2.518 1.846-4 4-4z" />
        <path d="M3 19c2.5 1 5.5 1.5 9 1.5s6.5-.5 9-1.5" />
      </svg>
    ),
    hoverClass: 'hover:text-amber-300 hover:drop-shadow-[0_0_6px_rgba(252,211,77,0.3)]'
  }
]

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800/30 mt-32 bg-gradient-to-b from-transparent to-slate-950/20 overflow-hidden">
      
      {/* Subtle Background Accent Line Lineage */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 py-14 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Side: Brand Block */}
        <div className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 rounded-md bg-blue-500/5 border border-blue-500/15 flex items-center justify-center transition-colors duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
            <Sigma className="w-3 h-3 text-blue-400/80 group-hover:text-blue-400 transition-colors" />
          </div>
          <span className="font-mono text-xs text-slate-500 tracking-wide select-none">
            Frimpong Gospel — {new Date().getFullYear()}
          </span>
        </div>

        {/* Center Side: Active Grid Socials Container */}
        <div className="flex items-center gap-5 bg-slate-950/30 border border-slate-900/60 rounded-full px-5 py-2.5 backdrop-blur-sm shadow-sm">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-slate-600 transition-all duration-300 transform hover:-translate-y-0.5 ${social.hoverClass}`}
              aria-label={social.name}
            >
              {social.icon}
            </Link>
          ))}

          {/* Divider */}
          <div className="w-px h-3.5 bg-slate-800/60" />

          {/* Email Accessor */}
          {/* <Link
            href="mailto:borngreatcoszay@gmail.com"
            className="text-slate-600 hover:text-blue-400 hover:drop-shadow-[0_0_6px_rgba(96,165,250,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </Link> */}

          <a href="
          mailto:borngreatcoszay@gmail.com"
            className="text-slate-600 hover:text-blue-400 hover:drop-shadow-[0_0_6px_rgba(96,165,250,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
            aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
        </div>

        {/* Right Side: Design Signature */}
        <p className="font-mono text-[10px] text-slate-600/70 tracking-[0.25em] select-none hover:text-slate-500 transition-colors duration-300">
          PROOF OF THOUGHT
        </p>
      </div>
    </footer>
  )
}