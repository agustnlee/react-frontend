import { useSelector } from "react-redux"
import { Trash2 } from "lucide-react"
import IconButton from "../common/IconButton"

export default function ProductCard({ product, onClick, onDelete }) {
  const { user } = useSelector(s => s.auth)
  const isOwner  = user && user.userId === product.ownerId

  return (
    <div
      onClick={onClick}
      className= "card-hover flex flex-col rounded-lg bg-surface cursor-pointer overflow-hidden"
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
          <div className="absolute top-2 left-2 right-12 flex gap-1 overflow-x-auto scrollbar-none">
            {product.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-primary/30 border border-black/10 text-white/70 whitespace-nowrap shrink-0 backdrop-blur-sm"
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
              filled
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