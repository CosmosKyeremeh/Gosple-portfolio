'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare, Hash, MapPin, Phone } from 'lucide-react'

interface FormState {
  name: string; email: string; subject: string; message: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Submission failed.')
    }
  }

  const inputClass = `w-full bg-slate-900/30 border border-slate-800/60 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600
    font-sans focus:outline-none focus:ring-1 focus:ring-purple-500/30 focus:border-purple-500/40 transition-all duration-300
    hover:border-slate-700/50`

  return (
    <div className="relative min-h-screen bg-[#070913] math-coordinate-grid flex items-center justify-center overflow-x-hidden">
      
      {/* 1. Low-Contrast Portrait Watermark Layer */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center mix-blend-screen opacity-[0.03] select-none">
        <div className="relative w-[800px] h-[800px] md:w-[1000px] md:h-[1000px]">
          <Image
            src="/profile.jpeg"
            alt="Background Watermark Map"
            fill
            priority
            className="object-contain grayscale contrast-125 brightness-75 rounded-full filter blur-[1px]"
          />
        </div>
      </div>

      {/* 2. Abstract Ambient Light Nodes */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[140px]" />
      </div>

      {/* 3. Main Interface Layout Container */}
      <div className="relative z-10 max-w-5xl w-full mx-auto px-4 pt-32 pb-24">
        
        {status === 'success' ? (
          <div className="bg-slate-950/40 backdrop-blur-xl max-w-xl mx-auto rounded-3xl p-12 border border-emerald-500/20 text-center space-y-5 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)]">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center rounded-2xl mx-auto animate-pulse">
              <CheckCircle className="w-7 h-7 text-emerald-400" />
            </div>
            <h2 className="font-serif text-3xl text-slate-100 font-bold tracking-tight">Message Transmitted</h2>
            <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
              Validation verified. Your query has been logged and sent directly to the mail server.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-slate-100 hover:border-slate-700 hover:bg-slate-800/50 transition-all duration-200"
            >
              Compose New Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Context Details */}
            <div className="lg:col-span-5 bg-slate-950/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.03)] relative overflow-hidden group">
              <div className="absolute -inset-px bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
              
              <div className="space-y-4 relative z-10">
                <span className="font-mono text-xs font-semibold text-purple-400 uppercase tracking-widest bg-purple-500/5 border border-purple-500/10 px-2.5 py-1 rounded-full">
                  Contact Info Section
                </span>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-50 tracking-tight leading-none pt-2">
                  Get in Touch
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed font-sans max-w-sm">
                  I am open to discussions on full-stack development, technical integrations, system architecture, or numerical engine optimization.
                </p>
              </div>

              {/* Functional Information Array */}
              <div className="space-y-4 mt-12 lg:mt-0 relative z-10 font-sans border-t border-slate-900/80 pt-8">
                <div className="flex items-center gap-3.5 text-slate-300 hover:text-purple-400 transition-colors duration-200">
                  <div className="w-9 h-9 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center text-slate-400 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium tracking-tight">Frimpongggospel75@gmail.com</span>
                </div>
                <div className="flex items-center gap-3.5 text-slate-300">
                  <div className="w-9 h-9 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center text-slate-400 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium tracking-tight">Accra, Ghana</span>
                </div>
                <div className="flex items-center gap-3.5 text-slate-300">
                  <div className="w-9 h-9 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center text-slate-400 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium tracking-tight">+233 59 948 9508</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interaction Form */}
            <div className="lg:col-span-7 bg-slate-950/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 md:p-10 space-y-5 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.03)] relative group">
              <div className="absolute -inset-px bg-gradient-to-bl from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
              
              <div className="flex justify-between items-center relative z-10 mb-2">
                <span className="font-mono text-xs font-semibold text-blue-400 uppercase tracking-widest bg-blue-500/5 border border-blue-500/10 px-2.5 py-1 rounded-full">
                  Contact Form
                </span>
              </div>

              {/* Name Field */}
              <div className="space-y-1.5 relative z-10">
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-4 h-4 text-slate-600" />
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Your Name*" className={`${inputClass} pl-11`}
                    disabled={status === 'loading'}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5 relative z-10">
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-4 h-4 text-slate-600" />
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="Email Address*" className={`${inputClass} pl-11`}
                    disabled={status === 'loading'}
                    required
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="space-y-1.5 relative z-10">
                <div className="relative flex items-center">
                  <Hash className="absolute left-4 w-4 h-4 text-slate-600" />
                  <input
                    type="text" name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Your Website (Optional)" className={`${inputClass} pl-11`}
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-1.5 relative z-10">
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-600" />
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Write your message...*" rows={4} className={`${inputClass} pl-11 resize-none`}
                    disabled={status === 'loading'}
                    required
                  />
                </div>
              </div>

              {/* Error Output Catch Block */}
              {status === 'error' && (
                <div className="flex items-center gap-2.5 text-xs font-mono text-rose-400 bg-rose-500/5 border border-rose-500/15 rounded-xl px-4 py-3.5 relative z-10 animate-fade-in">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Action Block */}
              <button
                type="submit"
                disabled={status === 'loading' || !form.name || !form.email || !form.message}
                className="w-full relative z-10 flex items-center justify-center gap-2.5 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 text-slate-50 font-sans font-semibold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(147,51,234,0.25)] hover:shadow-[0_4px_30px_rgba(147,51,234,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-100/30 border-t-slate-100 rounded-full animate-spin" />
                    <span>Processing Secure Relay…</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 tracking-normal transition-transform duration-200 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}