import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginApi } from "../api/auth"
import { loginSuccess } from "../store/authSlice"

export default function LoginPage() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const location  = useLocation()
  const returnTo  = location.state?.from || "/"

  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [error,    setError]    = useState(null)
  const [loading,  setLoading]  = useState(false)

  // simple empty check only since playground
  function validate() {
    if (!email.trim())    return "Email is required"
    if (!password.trim()) return "Password is required"
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)
      const data = await loginApi({ email: email.trim(), password })

      dispatch(loginSuccess({
        token: data.token,
        user: {
          userId:   data.userId,
          email:    data.email,
          username: data.username,
          role:     data.role,
        }
      }))

      navigate(returnTo)
    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm flex flex-col gap-6">

        {/* header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-text">Welcome back</h1>
          <p className="text-sm text-muted">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(null) }}
              placeholder="ex. you@email.com"
              className="
                px-3 py-2 rounded border border-border text-sm
                bg-surface text-text placeholder:text-muted
                outline-none transition-colors duration-200
                focus:border-primary
              "
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text" />
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(null) }}
              placeholder="••••••••"
              className="
                px-3 py-2 rounded border border-border text-sm
                bg-surface text-text placeholder:text-muted
                outline-none transition-colors duration-200
                focus:border-primary
              "
            />
          </div>

          {/* error */}
          {error && (
            <p className="text-xs text-danger">{error}</p>
          )}

          {/* submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-1"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        {/* register link */}
        <p className="text-sm text-muted text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:text-primary-hover transition-colors duration-200"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}