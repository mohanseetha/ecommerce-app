import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddProduct } from "./pages/AddProduct";
import { Navbar } from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import { ProductDetails } from "./pages/ProductDetails";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
const App = () => {
  return (
    <Box>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product-details/:prodId" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
