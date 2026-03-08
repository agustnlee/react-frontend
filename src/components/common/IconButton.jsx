import { cloneElement } from "react"

const sizes = {
  sm: { container: "w-7 h-7",   iconSize: 14 },
  md: { container: "w-9 h-9",   iconSize: 18 },
  lg: { container: "w-11 h-11", iconSize: 22 },
}

const variants = {
  default: { base: "text-muted border-border", hover: "hover:text-text hover:bg-surface-hover hover:border-primary" },
  danger:  { base: "text-muted border-border", hover: "hover:text-danger hover:bg-danger/10 hover:border-danger" },
  primary: { base: "text-muted border-border", hover: "hover:text-primary hover:bg-primary/10 hover:border-primary" },
  success: { base: "text-muted border-border", hover: "hover:text-success hover:bg-success/10 hover:border-success" },
}

const filling = {
  default: { backgroundColor: "rgba(34, 34, 34, 0.7)",  border: "1px solid var(--color-border)" },
  danger:  { backgroundColor: "rgba(239, 68, 68, 0.25)", border: "1px solid rgba(239,68,68,0.5)" },
  primary: { backgroundColor: "rgba(99, 102, 241, 0.25)", border: "1px solid rgba(99,102,241,0.5)" },
  success: { backgroundColor: "rgba(34, 197, 94, 0.25)", border: "1px solid rgba(34,197,94,0.5)" },
}

export default function IconButton({icon, onClick, label, variant = "default", size = "md", disabled = false, className = "", lift = false, shadow = false, filled = false }) {
  const { container, iconSize } = sizes[size]
  const variantClasses = variants[variant]
  const fillClasses             = filled ? filling[variant] : "bg-transparent"
  const { base, hover }         = variants[variant]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      onMouseEnter={e => {
        if (lift)   e.currentTarget.style.transform  = "translateY(-2px)"
        if (shadow) e.currentTarget.style.boxShadow  = hoverShadows[variant]
      }}
      onMouseLeave={e => {
        if (lift)   e.currentTarget.style.transform  = "translateY(0)"
        if (shadow) e.currentTarget.style.boxShadow  = "none"
      }}
      style={filled ? filling[variant] : {}}
      className={`
        ${container}
        flex items-center justify-center
        rounded-lg border
        transition-all duration-200 ease-in-out
        ${base} ${hover} 
        disabled:opacity-40 disabled:cursor-not-allowed
        cursor-pointer
        ${className}
      `}
    >
      {cloneElement(icon, { size: iconSize, strokeWidth: 1.8 })}
    </button>
  )
}