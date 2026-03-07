import { useSelector } from "react-redux" // hook for extracting data
import { Navigate, useLocation } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(s => s.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    // wrapps routes protected
    // in login page, go location.state?.from to track origin if any, else /
    // after login, redirect back there automatically
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}