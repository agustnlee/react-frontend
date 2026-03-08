import { useDispatch, useSelector } from "react-redux"
import { setSelectedTag } from "../../store/filtersSlice"

const TAGS = [
  { label: "All",          value: null          },
  { label: "Furniture",    value: "furniture"   },
  { label: "Electronics",  value: "electronics" },
  { label: "Vehicles",     value: "vehicles"    },
  { label: "Clothing",     value: "clothing"    },
  { label: "Books",        value: "books"       },
]

export default function TagFilter() { // tag pills
  const dispatch    = useDispatch()
  const selectedTag = useSelector(s => s.filters.selectedTag)


  // HERE IN FUTURE CAN MAKE IT A CONTAINER AND CAN MOVE AROUND IF OVERLOAD?? OR 2 ROWS"
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {TAGS.map(tag => {
        const isActive = tag.value === selectedTag

        return (
          <button
            key={tag.label}
            onClick={() => dispatch(setSelectedTag(tag.value))}
            className={`
              px-3 py-1 rounded-full text-xs border
              transition-all duration-200
              ${isActive
                ? "bg-primary border-primary text-white"
                : "bg-transparent border-border text-muted hover:border-primary hover:text-text"
              }
            `}
          >
            {tag.label}
          </button>
        )
      })}
    </div>
  )
}

