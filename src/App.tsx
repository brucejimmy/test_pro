import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import ProfilePage from "@/pages/ProfilePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/category" element={<CategoryPlaceholder />} />
      </Routes>
    </Router>
  );
}

function CategoryPlaceholder() {
  return (
    <div className="min-h-screen bg-bg_main pb-20 flex flex-col items-center justify-center">
      <div className="text-center">
        <p className="text-text_secondary text-sm">分类页面</p>
        <p className="text-text_primary font-semibold mt-2">即将上线</p>
      </div>
    </div>
  );
}
