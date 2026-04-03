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
import { useEffect, useLayoutEffect } from 'react';

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();

    const frameId = window.requestAnimationFrame(scrollToTop);
    const timeoutId = window.setTimeout(scrollToTop, 120);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname, search, hash]);

  useEffect(() => {
    const handlePageShow = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

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
