const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

export class ApiError extends Error {
  constructor(code, message, status) {
    super(message)
    this.code   = code
    this.status = status
  }
}

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token")

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  // 401 token expired or invalid
  if (res.status === 401) {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/login"
    return
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      code:    "UNKNOWN_ERROR",
      message: "Something went wrong"
    }))
    throw new ApiError(error.code, error.message, res.status)
  }

  // 204 no content 
  if (res.status === 204) return null

  return res.json()
}

// multipart (application/json)
export async function apiFetchMultipart(path, formData) {
  const token = localStorage.getItem("token")

  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  })

  if (res.status === 401) {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/login"
    return
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      code:    "UNKNOWN_ERROR",
      message: "Something went wrong"
    }))
    throw new ApiError(error.code, error.message, res.status)
  }

  return res.json()
}