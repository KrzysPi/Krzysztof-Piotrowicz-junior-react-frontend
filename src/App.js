import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Category from "./pages/Category.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Navbar from "./components/Navbar.jsx";
import { DataProvider } from "./context/DataContext.jsx";

function App() {
  return (
    <DataProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
