export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#070913] flex flex-col items-center justify-center z-50 gap-6">

      {/* Orbiting ring spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border border-slate-800" />
        <div className="absolute inset-0 rounded-full border-t-2 border-blue-500/70 animate-spin" />
        <div className="absolute inset-2 rounded-full border-t border-purple-500/50 animate-spin"
          style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-lg text-slate-400">∑</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {['G','o','s','p','l','e'].map((char, i) => (
          <span
            key={i}
            className="font-mono text-xs text-slate-600 animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}