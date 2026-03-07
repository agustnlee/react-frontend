import { useDispatch, useSelector } from "react-redux"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { setCurrentPage } from "../../store/productsSlice"

// could have added go to page (input) or enought with show max min for 5
export default function Pagination() {
  const dispatch    = useDispatch()
  const { currentPage, totalPages, totalElements, loading } = useSelector(s => s.products)

  if (totalPages <= 1) return null  // hide if only 1 page

  const pages     = Array.from({ length: totalPages }, (_, i) => i)
  const isFirst   = currentPage === 0
  const isLast    = currentPage === totalPages - 1

  // show max 5 page numbers around current
  const visible = pages.filter(p =>
    p === 0 ||
    p === totalPages - 1 ||
    Math.abs(p - currentPage) <= 2
  )

  function handlePage(page) {
    if (page === currentPage || loading) return
    dispatch(setCurrentPage(page))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex flex-col items-center gap-3 py-6">

      {/* total count */}
      <p className="text-xs text-muted">
        {totalElements} products ~ page {currentPage + 1} of {totalPages}
      </p>

      {/* controls */}
      <div className="flex items-center gap-1">

        {/* prev one */}
        <button
          onClick={() => handlePage(currentPage - 1)}
          disabled={isFirst || loading}
          className="btn-ghost px-2 py-2 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        {/* page numbers */}
        {visible.map((page, idx) => {
          const prevPage = visible[idx - 1]
          const showEllipsis = prevPage !== undefined && page - prevPage > 1

          return (
            <span key={page} className="flex items-center gap-1">
              {showEllipsis && (
                <span className="px-1 text-muted text-sm">...</span>
              )}
              <button
                onClick={() => handlePage(page)}
                disabled={loading}
                className={`
                  w-8 h-8 rounded text-sm transition-all duration-200
                  ${page === currentPage
                    ? "bg-primary text-white border border-primary"
                    : "btn-ghost"
                  }
                `}
              >
                {page + 1}
              </button>
            </span>
          )
        })}

        {/* next one */}
        <button
          onClick={() => handlePage(currentPage + 1)}
          disabled={isLast || loading}
          className="btn-ghost px-2 py-2 disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>

      </div>
    </div>
  )
}
