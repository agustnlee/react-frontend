import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { X, Trash2 } from "lucide-react"
import { fetchProductById, deleteProduct, clearSelected } from "../../store/productsSlice"
import IconButton from "../common/IconButton"

export default function ProductModal({ productId, onClose }) {
  const dispatch  = useDispatch()
  const { selected, selectedLoading } = useSelector(s => s.products)
  const { user }  = useSelector(s => s.auth)
  const isOwner   = user && selected && user.userId === selected.ownerId

  // fetch full detail on open
  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId))
    return () => dispatch(clearSelected())
  }, [productId])

  // close on escape ¿
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [onClose])

  async function handleDelete() {
    await dispatch(deleteProduct(selected.id))
    onClose()
  }

  return (
    // overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-[2px]"
      onClick={onClose}
    >
      {/* modal box */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-surface shadow-lg"
        onClick={e => e.stopPropagation()}
      >

        {/* close button */}
        <div className="absolute top-3 right-3 z-10">
          <IconButton
            icon={<X />}
            label="Close"
            variant="default"
            size="sm"
            onClick={onClose}
          />
        </div>

        {selectedLoading || !selected ? (
          <div className="flex items-center justify-center h-64 text-muted text-sm">
            Loading...
          </div>
        ) : (
          <>
            {/* image */}
            {selected.imageUrl && (
              <div className="w-full aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={selected.imageUrl}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* content */}
            <div className="flex flex-col gap-4 p-6">

              {/* title + price */}
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold text-text leading-snug">
                  {selected.title}
                </h2>
                <span className="text-xl font-bold text-primary whitespace-nowrap">
                  ${selected.price}
                </span>
              </div>

              {/* tags */}
              {selected.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full border border-border text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* description */}
              {selected.description && (
                <p className="text-sm text-muted leading-relaxed">
                  {selected.description}
                </p>
              )}

              {/* dynamic attributes */}
              {selected.attributes && Object.keys(selected.attributes).length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-muted uppercase tracking-wider">
                    Details
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selected.attributes).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex flex-col gap-0.5 p-2 rounded border border-border bg-bg"
                      >
                        <span className="text-xs text-muted capitalize">{key}</span>
                        <span className="text-sm text-text">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* footer  owner + date + delete */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted">
                    Posted by @{selected.ownerUsername}
                  </span>
                  <span className="text-xs text-muted">
                    {new Date(selected.uploadedAt).toLocaleDateString()}
                  </span>
                </div>

                {isOwner && (
                  <button
                    onClick={handleDelete}
                    className="btn-danger gap-2"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                )}
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  )
}