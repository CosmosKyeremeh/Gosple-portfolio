import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:   string
  error?:   string
  icon?:    React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-500 uppercase tracking-widest"
          >
            {icon}
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full bg-slate-950/60 border rounded-xl px-4 py-3
            text-sm text-slate-200 placeholder-slate-700 font-sans
            focus:outline-none focus:ring-1 transition-all duration-200
            ${error
              ? 'border-red-500/40 focus:ring-red-500/30 focus:border-red-500/50'
              : 'border-slate-800/60 focus:ring-blue-500/30 focus:border-blue-500/30 hover:border-slate-700/60'
            }
            disabled:opacity-40 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-xs font-mono text-red-400 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input