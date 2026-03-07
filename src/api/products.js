import { apiFetch, apiFetchMultipart } from "./client"

export async function getProductsApi({ page = 0, size = 20, search, tag } = {}) {
  const params = new URLSearchParams({ page, size })
  
  if (search) params.append("search", search)
  if (tag)    params.append("tag",    tag)

  return apiFetch(`/api/products?${params.toString()}`)
}

export async function getProductByIdApi(id) {
  return apiFetch(`/api/products/${id}`)
}

export async function createProductApi({ dto, image }) {
  const formData = new FormData()

  // data part  application/json chunk
  formData.append(
    "data",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  )

  if (image) formData.append("image", image)

  return apiFetchMultipart("/api/products", formData)
}

export async function deleteProductApi(id) {
  return apiFetch(`/api/products/${id}`, { method: "DELETE" })
}