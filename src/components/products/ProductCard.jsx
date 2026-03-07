import { useSelector } from "react-redux"
import { Trash2 } from "lucide-react"
import IconButton from "../common/IconButton"

export default function ProductCard({ product, onClick, onDelete }) {
  const { user } = useSelector(s => s.auth)
  const isOwner  = user && user.userId === product.ownerId

  return (
    <div
      onClick={onClick}
      className="
        flex flex-col rounded-lg border border-border bg-surface
        hover:border-primary hover:shadow-lg
        transition-all duration-200 cursor-pointer overflow-hidden
      "
    >
      {/* image */}
      <div className="relative w-full aspect-video bg-bg overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs">
            No image
          </div>
        )}

        {/* tags top left overlay */}
        {product.tags?.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-bg/80 border border-border text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* delete button top right, only owner */}
        {isOwner && (
          <div
            className="absolute top-2 right-2"
            onClick={e => { e.stopPropagation(); onDelete(product.id) }}
          >
            <IconButton
              icon={<Trash2 />}
              label="Delete product"
              variant="danger"
              size="sm"
            />
          </div>
        )}
      </div>

      {/* content */}
      <div className="flex flex-col gap-2 p-4 flex-1">

        {/* title */}
        <h3 className="text-sm font-medium text-text line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* price + owner username */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          <span className="text-base font-semibold text-primary">
            ${product.price}
          </span>
          <span className="text-xs text-muted">
            @{product.ownerUsername}
          </span>
        </div>

      </div>
    </div>
  )
}