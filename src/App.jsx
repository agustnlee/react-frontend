import { Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import ProductsPage from "./pages/ProductsPage"
import LoginPage    from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CreateProductPage  from "./pages/CreateProductPage"
import ProtectedRoute from "./components/common/ProtectedRoute"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Navbar />
      <main 
        className="flex-1 flex flex-col"
        style={{
          padding: "var(--page-padding-y) var(--page-padding-x)",
        }}
      >
        <Routes>
          <Route path="/"         element={<ProductsPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create"   element={
              <ProtectedRoute>
                <CreateProductPage />
              </ProtectedRoute> 
            } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}