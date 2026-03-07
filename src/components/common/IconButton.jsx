import { cloneElement } from "react"

const sizes = {
  sm: { container: "w-7 h-7",   iconSize: 14 },
  md: { container: "w-9 h-9",   iconSize: 18 },
  lg: { container: "w-11 h-11", iconSize: 22 },
}

const variants = {
  default: "text-muted border-border hover:text-text hover:bg-surface-hover hover:border-primary",
  danger:  "text-muted border-border hover:text-danger hover:bg-danger/10 hover:border-danger",
  primary: "text-muted border-border hover:text-primary hover:bg-primary/10 hover:border-primary",
  success: "text-muted border-border hover:text-success hover:bg-success/10 hover:border-success",
}

export default function IconButton({icon, onClick, label, variant = "default", size = "md", disabled = false, className = "", }) {
  const { container, iconSize } = sizes[size]
  const variantClasses = variants[variant]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`
        ${container}
        flex items-center justify-center
        rounded-lg border
        transition-all duration-200 ease-in-out
        ${variantClasses}
        disabled:opacity-40 disabled:cursor-not-allowed
        cursor-pointer
        ${className}
      `}
    >
      {cloneElement(icon, { size: iconSize, strokeWidth: 1.8 })}
    </button>
  )
}