import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant
  size?:     Size
  loading?:  boolean
  icon?:     React.ReactNode
}

const variants: Record<Variant, string> = {
  primary:   'bg-blue-500/10 border border-blue-500/25 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/40',
  secondary: 'bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:bg-slate-700/60 hover:border-slate-600',
  ghost:     'border border-transparent text-slate-500 hover:text-slate-200 hover:bg-slate-800/40 hover:border-slate-700/40',
  danger:    'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-400/30',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, children, className = '', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center font-mono rounded-xl
          transition-all duration-200 cursor-pointer
          disabled:opacity-40 disabled:cursor-not-allowed
          ${variants[variant]} ${sizes[size]} ${className}
        `}
        {...props}
      >
        {loading
          ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
          : icon
        }
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button