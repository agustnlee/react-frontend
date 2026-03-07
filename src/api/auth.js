import { apiFetch } from "./client"

export async function registerApi(data) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body:   JSON.stringify(data),
  })
}

export async function loginApi(data) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body:   JSON.stringify(data),
  })
}