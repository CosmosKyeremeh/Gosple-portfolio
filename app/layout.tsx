import type { Metadata } from 'next'
import { Crimson_Pro, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { Analytics }      from '@vercel/analytics/react'
import { SpeedInsights }  from '@vercel/speed-insights/next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import 'katex/dist/katex.min.css'
import './globals.css'

const crimson = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Gospel — CS & Mathematics',
    template: '%s | Gospel',
  },
  description:
    'Proof of Thought — Exploring computational algorithms, discrete structures, and mathematical insight.',
  keywords: ['mathematics', 'computer science', 'algorithms', 'linear algebra', 'portfolio'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${crimson.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body className="bg-[#070913] text-slate-100 font-sans antialiased selection:bg-purple-500/30">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}