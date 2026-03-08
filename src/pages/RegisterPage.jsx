import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { registerApi } from "../api/auth"
import { loginSuccess } from "../store/authSlice"

export default function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email,    setEmail]    = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)

  // simple empty check
  function validate() {
    const e = {}
    if (!email.trim())    e.email    = "Email is required"
    if (!username.trim()) e.username = "Username is required"
    if (!password.trim()) e.password = "Password is required"
    return e
  }

  async function handleSubmit(e) { // testin gtry catch instead of other projects return err obj and if err?
    e.preventDefault()
    setErrors({})

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)
      const data = await registerApi({
        email:    email.trim(),
        username: username.trim(),
        password,
      })

      dispatch(loginSuccess({
        token: data.token,
        user: {
          userId:   data.userId,
          email:    data.email,
          username: data.username,
          role:     data.role,
        }
      }))

      navigate("/")
    } catch (err) {
      // map backend error codes to field errors
      if (err.code === "EMAIL_IN_USE") {
        setErrors({ email: "Email already registered" })
      } else if (err.code === "USERNAME_IN_USE") {
        setErrors({ username: "Username already taken" })
      } else {
        setErrors({ submit: err.message || "Registration failed" })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm flex flex-col gap-6">

        {/* header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-text">Create a new account</h1>
          <p className="text-sm text-muted">Join now! </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: null })) }}
              placeholder="you@email.com"
              className={`
                px-3 py-2 rounded border text-sm
                bg-surface text-text placeholder:text-muted
                outline-none transition-colors duration-200
                ${errors.email ? "border-danger" : "border-border focus:border-primary"}
              `}
            />
            {errors.email && (
              <p className="text-xs text-danger">{errors.email}</p>
            )}
          </div>

          {/* username */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setErrors(p => ({ ...p, username: null })) }}
              placeholder="agus123"
              className={`
                px-3 py-2 rounded border text-sm
                bg-surface text-text placeholder:text-muted
                outline-none transition-colors duration-200
                ${errors.username ? "border-danger" : "border-border focus:border-primary"}
              `}
            />
            {errors.username && (
              <p className="text-xs text-danger">{errors.username}</p>
            )}
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: null })) }}
              placeholder="••••••••"
              className={`
                px-3 py-2 rounded border text-sm
                bg-surface text-text placeholder:text-muted
                outline-none transition-colors duration-200
                ${errors.password ? "border-danger" : "border-border focus:border-primary"}
              `}
            />
            {errors.password && (
              <p className="text-xs text-danger">{errors.password}</p>
            )}
          </div>

          {/* submit error */}
          {errors.submit && (
            <p className="text-xs text-danger text-center">{errors.submit}</p>
          )}

          {/* submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-1"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

        </form>

        {/* login link */}
        <p className="text-sm text-muted text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-primary-hover transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}