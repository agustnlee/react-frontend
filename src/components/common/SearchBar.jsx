import { useDispatch, useSelector } from "react-redux"
import { Search, X } from "lucide-react"
import { setSearch, setSelectedTag, clearFilters } from "../../store/filtersSlice"
import Dropdown from "./Dropdown"


// tags for now hardcoded, in future api fetch
const TAG_OPTIONS = [
  { label: "Furniture",    value: "furniture"    },
  { label: "Electronics",  value: "electronics"  },
  { label: "Vehicles",     value: "vehicles"     },
  { label: "Clothing",     value: "clothing"     },
  { label: "Books",        value: "books"        },
]

export default function SearchBar() {
  const dispatch    = useDispatch()
  const search      = useSelector(s => s.filters.search)
  const selectedTag = useSelector(s => s.filters.selectedTag)

  const hasFilters = search || selectedTag

  return (
    <div className="flex items-center gap-4 w-full">

      {/* search input */}
      <div className="relative flex-1">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none pr-4"
        />
        <input
          type="text"
          value={search}
          onChange={e => dispatch(setSearch(e.target.value))}
          placeholder="Search products..."
          className={`
            w-full pl-14 pr-4 py-2 rounded border text-sm
            bg-surface text-text placeholder:text-muted
            transition-all duration-200 outline-none
            focus:border-primary
            ${search ? "border-primary" : "border-border"}
          `}
        />
        {/* clear search */}
        {search && (
          <button
            onClick={() => dispatch(setSearch(""))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* tag dropdown */}
      <Dropdown
        options={TAG_OPTIONS}
        value={selectedTag}
        onChange={val => dispatch(setSelectedTag(val))}
        placeholder="Filter by tag"
        className="w-44"
      />

      {/* clear all filters */}
      {hasFilters && (
        <button
          onClick={() => dispatch(clearFilters())}
          className="btn-ghost text-xs gap-1 whitespace-nowrap"
        >
          <X size={12} />
          Clear all
        </button>
      )}

    </div>
  )
}