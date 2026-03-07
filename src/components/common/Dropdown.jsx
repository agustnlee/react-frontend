import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function Dropdown({ // dropdown for filters component
  options,        // examples [{ label: "Car", value: "car" }]
  value,          // currently selected 
  onChange,      
  placeholder = "Select...", className = "",
}) {
  const [open, setOpen]     = useState(false)
  const containerRef        = useRef(null)

  const selected = options.find(o => o.value === value)

  // close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  function handleSelect(option) {
    onChange(option.value === value ? null : option.value) // toggle off if same
    setOpen(false)
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>

      {/* trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`
          w-full flex items-center justify-between gap-2
          px-3 py-2 rounded border text-sm
          transition-all duration-200
          ${open
            ? "border-primary text-text bg-surface"
            : "border-border text-muted bg-surface hover:border-primary hover:text-text"
          }
        `}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* dropdown list */}
      {open && (
        <ul
          className="absolute z-50 w-full mt-1 rounded border border-border bg-surface shadow-lg overflow-hidden"
        >
          {/* clearing option */}
          <li>
            <button
              onClick={() => { onChange(null); setOpen(false) }}
              className="w-full px-3 py-2 text-left text-xs text-muted hover:bg-surface-hover transition-colors duration-150"
            >
              Clear filter
            </button>
          </li>

          {options.map(option => (
            <li key={option.value}>
              <button
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-3 py-2 text-left text-sm
                  transition-colors duration-150
                  ${option.value === value
                    ? "text-primary bg-primary/10"
                    : "text-text hover:bg-surface-hover"
                  }
                `}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}