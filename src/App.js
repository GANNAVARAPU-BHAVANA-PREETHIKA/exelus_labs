import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import CustomSynthesis from './pages/CustomSynthesis';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ProductList from './pages/ProductList';
import ProductImpurityList from './pages/ProductImpurityList';
import ProductApiList from './pages/ProductApiList';
import ProductDetail from './pages/ProductDetail';
import { ProductProvider } from './context/ProductContext';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/letter/:letter" element={<ProductImpurityList />} />
          <Route path="/products/letter/:letter/impurity/:impurityName" element={<ProductApiList />} />
          <Route path="/products/:code" element={<ProductDetail />} />
          <Route path="/services" element={<CustomSynthesis />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
