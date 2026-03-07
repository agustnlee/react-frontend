import { Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import ProductsPage from "./pages/ProductsPage"
import LoginPage    from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProtectedRoute from "./components/common/ProtectedRoute"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/"         element={<ProductsPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />


          <ProtectedRoute>
            {/* For protected routes */}
          </ProtectedRoute>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}