interface CardProps {
  children:   React.ReactNode
  className?: string
  hover?:     boolean
  accent?:    'blue' | 'purple' | 'amber' | 'emerald' | 'none'
  padding?:   'sm' | 'md' | 'lg'
}

const accents: Record<string, string> = {
  blue:    'hover:border-blue-500/25',
  purple:  'hover:border-purple-500/25',
  amber:   'hover:border-amber-500/25',
  emerald: 'hover:border-emerald-500/25',
  none:    '',
}

const paddings: Record<string, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({
  children,
  className = '',
  hover = false,
  accent = 'blue',
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={`
        glass-panel-3d rounded-2xl border border-slate-800/40
        ${paddings[padding]}
        ${hover ? `transition-all duration-300 ${accents[accent]}` : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}