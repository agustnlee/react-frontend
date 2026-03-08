import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, deleteProduct } from "../store/productsSlice"
import { setSearch, setSelectedTag } from "../store/filtersSlice"
import SearchBar    from "../components/common/SearchBar"
import TagFilter    from "../components/filters/TagFilter"
import ProductsGrid from "../components/products/ProductsGrid"
import ProductModal from "../components/products/ProductModal"
import Pagination   from "../components/products/Pagination"

export default function ProductsPage() {
  const dispatch    = useDispatch()
  const { currentPage }       = useSelector(s => s.products)
  const { search, selectedTag } = useSelector(s => s.filters)

  const [selectedId, setSelectedId] = useState(null)  // for modal

  // re-fetch whenever page, search, or tag changes (locale)
  useEffect(() => {
    dispatch(fetchProducts({
      page:   currentPage,
      search: search   || undefined,
      tag:    selectedTag || undefined,
    }))
  }, [currentPage, search, selectedTag])

  async function handleDelete(id) {
    await dispatch(deleteProduct(id))
  }

  return (
    <div className="flex-1 flex flex-col gap-4 px-6 py-6">

      {/* search + filters */}
      <div className="flex flex-col gap-3">
        <SearchBar />
        <TagFilter />
      </div>

      {/* grid */}
      <ProductsGrid
        onSelect={p => setSelectedId(p.id)}
        onDelete={handleDelete}
      />

      {/* pagination */}
      <Pagination />

      {/* modal */}
      {selectedId && (
        <ProductModal
          productId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}

    </div>
  )
}