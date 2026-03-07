import { useSelector } from "react-redux"
import ProductCard from "./ProductCard"

export default function ProductsGrid({ onSelect, onDelete }) {
  const { items, loading, error } = useSelector(s => s.products)

  if (loading) return (
    <div className="flex-1 flex items-center justify-center text-muted text-sm">
      Loading products...
    </div>
  )

  if (error) return (
    <div className="flex-1 flex items-center justify-center text-danger text-sm">
      {error.message || "Failed to load products"}
    </div>
  )

  if (!items.length) return (
    <div className="flex-1 flex items-center justify-center text-muted text-sm">
      No products found
    </div>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> {/* column responsiveness */}
      {items.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onSelect(product)}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}