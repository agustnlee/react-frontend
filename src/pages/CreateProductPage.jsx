import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Plus, X, Upload } from "lucide-react"
import { createProductApi } from "../api/products"
import { fetchProducts } from "../store/productsSlice"

const AVAILABLE_TAGS = [
  "furniture", "electronics", "vehicles",
  "clothing", "books", "sports", "home", "other"
]

export default function CreateProductPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // form data state
  const [title,       setTitle]       = useState("")
  const [description, setDescription] = useState("")
  const [price,       setPrice]       = useState("")
  const [tags,        setTags]        = useState([])        // selected tag strings
  const [attributes,  setAttributes]  = useState([])        // of [{ key: "", value: "" }]
  const [image,       setImage]       = useState(null)      // File object for image
  const [preview,     setPreview]     = useState(null)      // base64 encoded preview URL

  // ui states
  const [loading, setLoading] = useState(false)
  const [errors,  setErrors]  = useState({})               // field leveled errors

  // Validations
  function validate() {
    const e = {}
    if (!title.trim())        e.title = "Title is required"
    if (!price)               e.price = "Price is required"
    if (isNaN(price) || Number(price) <= 0)
                              e.price = "Price must be a positive number"

    
    attributes.forEach((attr, idx) => {
      if (!attr.key.trim())   e[`attr_key_${idx}`]   = "Key cannot be empty"
      if (!attr.value.trim()) e[`attr_value_${idx}`] = "Value cannot be empty"
    })

    return e
  }

  //tages
  function toggleTag(tag) {
    setTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // attributes handlers
  function addAttribute() {
    setAttributes(prev => [...prev, { key: "", value: "" }])
  }

  function updateAttribute(idx, field, val) {
    setAttributes(prev => prev.map((attr, i) =>
      i === idx ? { ...attr, [field]: val } : attr
    ))
    // clear error on change just in case I supp
    setErrors(prev => {
      const next = { ...prev }
      delete next[`attr_${field}_${idx}`]
      return next
    })
  }

  function removeAttribute(idx) {
    setAttributes(prev => prev.filter((_, i) => i !== idx))
    // clear related errors
    setErrors(prev => {
      const next = { ...prev }
      delete next[`attr_key_${idx}`]
      delete next[`attr_value_${idx}`]
      return next
    })
  }

  // image handler
  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    // preview
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  function removeImage() {
    setImage(null)
    setPreview(null)
  }

  // submits
  async function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // convert attribute rows to object
    const attributesMap = attributes.reduce((acc, { key, value }) => {
      acc[key.trim()] = value.trim()
      return acc
    }, {})

    const dto = { // dto for creating 
      title:       title.trim(),
      description: description.trim(),
      price:       Number(price),
      tags,
      attributes:  attributesMap,
    }

    try {
      setLoading(true)
      await createProductApi({ dto, image })
      dispatch(fetchProducts({ page: 0 }))  // refresh listing
      navigate("/")
    } catch (err) {
      setErrors({ submit: err.message || "Failed to create product" })
    } finally {
      setLoading(false)
    }
  }


  // LITTLE COUPLING for not needing modify page yet, else resusable components ought to be devd
  return (
    <div className="flex-1 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-xl flex flex-col gap-6">

        {/* header */}
        <div>
          <h1 className="text-2xl font-semibold text-text">Add New Product</h1>
          <p className="text-sm text-muted mt-1">Fill in the details below</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* TITLE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text">
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => { setTitle(e.target.value); setErrors(p => ({ ...p, title: null })) }}
              placeholder="e.g. Best Dictionary"
              className={`
                px-3 py-2 rounded border text-sm bg-surface text-text
                placeholder:text-muted outline-none
                transition-colors duration-200
                ${errors.title ? "border-danger" : "border-border focus:border-primary"}
              `}
            />
            {errors.title && (
              <p className="text-xs text-danger">{errors.title}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text">
              Description
              <span className="text-muted text-xs ml-1">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe your product..."
              rows={3}
              className="
                px-3 py-2 rounded border border-border text-sm bg-surface text-text
                placeholder:text-muted outline-none resize-none
                transition-colors duration-200 focus:border-primary
              "
            />
          </div>

          {/* PRICE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text">
              Price <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">
                $
              </span>
              <input
                type="number"
                value={price}
                onChange={e => { setPrice(e.target.value); setErrors(p => ({ ...p, price: null })) }}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={`
                  w-full pl-7 pr-3 py-2 rounded border text-sm bg-surface text-text
                  placeholder:text-muted outline-none
                  transition-colors duration-200
                  ${errors.price ? "border-danger" : "border-border focus:border-primary"}
                `}
              />
            </div>
            {errors.price && (
              <p className="text-xs text-danger">{errors.price}</p>
            )}
          </div>

          {/* TAGS */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text">
              Tags
              <span className="text-muted text-xs ml-1">(optional)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map(tag => {
                const active = tags.includes(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`
                      px-3 py-1 rounded-full text-xs border
                      transition-all duration-200 capitalize
                      ${active
                        ? "bg-primary border-primary text-white"
                        : "bg-transparent border-border text-muted hover:border-primary hover:text-text"
                      }
                    `}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ATTRIBUTES */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text">
              Attributes
              <span className="text-muted text-xs ml-1">(optional)</span>
            </label>

            {attributes.map((attr, idx) => (
              <div key={idx} className="flex items-start gap-2">
                {/* key */}
                <div className="flex flex-col gap-1 flex-1">
                  <input
                    type="text"
                    value={attr.key}
                    onChange={e => updateAttribute(idx, "key", e.target.value)}
                    placeholder="e.g. material"
                    className={`
                      px-3 py-2 rounded border text-sm bg-surface text-text
                      placeholder:text-muted outline-none
                      transition-colors duration-200
                      ${errors[`attr_key_${idx}`] ? "border-danger" : "border-border focus:border-primary"}
                    `}
                  />
                  {errors[`attr_key_${idx}`] && ( 
                    <p className="text-xs text-danger">{errors[`attr_key_${idx}`]}</p>
                  )} {/* in future dirrectly tooltip on hover */}
                </div>

                {/* value */}
                <div className="flex flex-col gap-1 flex-1">
                  <input
                    type="text"
                    value={attr.value}
                    onChange={e => updateAttribute(idx, "value", e.target.value)}
                    placeholder="e.g. wood"
                    className={`
                      px-3 py-2 rounded border text-sm bg-surface text-text
                      placeholder:text-muted outline-none
                      transition-colors duration-200
                      ${errors[`attr_value_${idx}`] ? "border-danger" : "border-border focus:border-primary"}
                    `}
                  />
                  {errors[`attr_value_${idx}`] && (
                    <p className="text-xs text-danger">{errors[`attr_value_${idx}`]}</p>
                  )}
                </div>

                {/* remove row */}
                <button
                  type="button"
                  onClick={() => removeAttribute(idx)}
                  className="mt-0.5 text-muted hover:text-danger transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addAttribute}
              className="btn-ghost text-xs gap-1 self-start"
            >
              <Plus size={13} />
              Add attribute
            </button>
          </div>

          {/* IMAGE */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text">
              Image
              <span className="text-muted text-xs ml-1">(optional)</span>
            </label>

            {preview ? (
              <div className="relative w-full aspect-video rounded border border-border overflow-hidden">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2"
                >
                  <X size={16} className="text-white drop-shadow" />
                </button>
              </div>
            ) : (
              <label className="
                flex flex-col items-center justify-center gap-2
                w-full aspect-video rounded border-2 border-dashed border-border
                text-muted text-sm cursor-pointer
                hover:border-primary hover:text-text
                transition-colors duration-200
              ">
                <Upload size={20} />
                <span>Click to upload image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* SUBMIT ERROR */}
          {errors.submit && (
            <p className="text-sm text-danger text-center">{errors.submit}</p>
          )}

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-ghost flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}