import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { User, Plus } from "lucide-react"
import IconButton from "../common/IconButton"
import { logout } from "../../store/authSlice"

export default function Navbar() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(s => s.auth)

  return (
    <nav className="w-full grid grid-cols-3 items-center px-6 h-navbar bg-surface border-b border-border">

      {/* LEFT */}
      <div className="flex items-center">
        <Link
          to="/"
          className="font-bold text-lg text-primary transition-colors duration-200 hover:text-primary-hover"
        >
          TEST
        </Link>
      </div>

      {/* MID */}
      <div className="flex items-center justify-center gap-6">
        <Link
          to="/"
          className="text-sm text-muted transition-colors duration-200 hover:text-text"
        >
          Products
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end gap-3">
        {isAuthenticated ? (
          <>
            <Link to="/create">
              <button className="btn-primary gap-1 text-xs">
                <Plus size={13} />
                New
              </button>
            </Link>

            <IconButton
              icon={<User />}
              label="Profile"
              variant="default"
              size="md"
              onClick={() => {}}
            />
            <button
              className="btn-ghost text-xs"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn-ghost">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn-primary">Register</button>
            </Link>
          </>
        )}

      </div>

    </nav>
  )
}