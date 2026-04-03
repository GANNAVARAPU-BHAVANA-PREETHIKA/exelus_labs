// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { DEFAULT_PRODUCT_IMAGE, fetchFeaturedProductsByCatNo, isSupabaseConfigured } from '../services/productService';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import iso1 from '../assets/iso1.jpg';
import iso2 from '../assets/iso2.jpg';
import who from '../assets/who.png';
import accediate3 from '../assets/accediate3.png';
import accediate4 from '../assets/accediate4.png';

const SLIDE_DURATIONS = [5000, 15000];

const FEATURED_PRODUCT_CAT_NOS = [
  'EXL-C-00039',
  'EXL-C-00007',
  'EXL-C-00055',
  'EXL-C-00064',
  'EXL-C-00072',
  'EXL-C-00085',
  'EXL-C-00098',
  'EXL-C-00131',
  'EXL-C-00137',
  'EXL-C-00168',
  'EXL-C-00181',
  'EXL-C-00187',
  'EXL-C-00207',
  'EXL-C-00227',
  'EXL-C-00246',
  'EXL-C-00281',
  'EXL-C-00284',
  'EXL-C-00020',
  'EXL-C-00322',
  'EXL-C-00337',
  'EXL-C-00364',
  'EXL-C-00374',
  'EXL-C-00397',
  'EXL-C-00417',
  'EXL-C-00052',
  'EXL-C-00449',
  'EXL-C-00450',
  'EXL-C-00451',
  'EXL-C-00452',
  'EXL-C-00453',
  'EXL-C-00454',
  'EXL-C-00455',
  'EXL-C-00456',
];

const Home = () => {
  const navigate = useNavigate();
  const productsContainerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState('');
  const [brokenImages, setBrokenImages] = useState({});
  const slides = [slide1, slide2];

  useEffect(() => {
    const slideDuration = SLIDE_DURATIONS[currentSlide] ?? 7000;
    const timeout = window.setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideDuration);

    return () => window.clearTimeout(timeout);
  }, [currentSlide, slides.length]);

  useEffect(() => {
    let isMounted = true;

    async function loadFeaturedProducts() {
      try {
        setProductsError('');
        const data = await fetchFeaturedProductsByCatNo(FEATURED_PRODUCT_CAT_NOS);
        if (!isMounted) return;
        setProducts(data);
      } catch (error) {
        if (!isMounted) return;
        setProducts([]);
        setProductsError(
          isSupabaseConfigured()
            ? 'Unable to load latest products right now.'
            : 'Supabase is not configured.'
        );
      }
    }

    loadFeaturedProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!productsContainerRef.current) return;

    const container = productsContainerRef.current;
    const resetScroll = () => {
      container.scrollLeft = 0;
      container.scrollTo({ left: 0, behavior: 'auto' });
    };

    resetScroll();
    const frameId = window.requestAnimationFrame(resetScroll);

    return () => window.cancelAnimationFrame(frameId);
  }, [products.length]);

  const scrollCarousel = (direction) => {
    const container = productsContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    if (direction === 1) {
      container.scrollLeft += scrollAmount;
    } else {
      container.scrollLeft -= scrollAmount;
    }
  };

  return (
    <div className="home">
      <div className="slideshow-container">
        {slides.map((src, index) => (
          <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
            <img src={src} alt={`Slide ${index + 1}`} className="full-slide" />
          </div>
        ))}
        <button className="explore-btn" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
          Explore More
        </button>
      </div>

      <section className="about-section">
        <div className="about-section-inner">
          <div className="about-left">
            <span className="about-eyebrow">Who We Are</span>
            <h2 className="about-heading">About<br />Exelus Labs</h2>
            <div className="about-divider"></div>
            <p className="about-tagline">Quality Leads.</p>
          </div>
          <div className="about-right">
            <p>
              Exelus Labs is a leading provider of <strong>high-quality chemical reference standards, pharmaceutical impurities, metabolites, stable isotopes, controlled substances, nitrosamine impurities, complex impurities, and peptide impurities.</strong>
            </p>
            <p>
              We support global research, drug development, and regulatory submissions by delivering reliable and precisely characterized analytical materials. Our solutions empower pharmaceutical, biotechnology, and research organizations to achieve scientific excellence and ensure regulatory compliance.
            </p>
          </div>
        </div>
      </section>

      <section id="products" className="section">
        <h2>Latest Products</h2>
        {productsError && <p className="products-error">{productsError}</p>}
        <div className="products-carousel">
          <button className="carousel-arrow left-arrow" onClick={() => scrollCarousel(-1)}>&#10094;</button>
          <div className="products-container" ref={productsContainerRef}>
            <div className="products">
              {products.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  onClick={() => navigate(`/products/${product.cat_no}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3 className="product-title" title={product.name}>
                    {product.name}
                  </h3>
                  <div className="product-img">
                    <img
                      src={brokenImages[product.id] ? DEFAULT_PRODUCT_IMAGE : product.image_url || DEFAULT_PRODUCT_IMAGE}
                      alt={product.name}
                      onError={() =>
                        setBrokenImages((current) => ({ ...current, [product.id]: true }))
                      }
                    />
                  </div>
                  <div
                    className="product-details-scroll"
                  >
                    <table className="product-details">
                      <tbody>
                        <tr><td>API Name</td><td>{product.api_name || '-'}</td></tr>
                        <tr><td>CAT No.</td><td>{product.cat_no || '-'}</td></tr>
                        <tr><td>CAS No.</td><td>{product.cas_no || '-'}</td></tr>
                        <tr><td>Molecular Formula</td><td>{product.molecular_formula || '-'}</td></tr>
                        <tr><td>Molecular Weight</td><td>{product.molecular_weight || '-'}</td></tr>
                        <tr><td>Inventory</td><td>{product.availability || '-'}</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="button-wrapper">
                    <Link
                      to={`/products/${product.cat_no}`}
                      className="btn"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
              <div className="updates-card">
                <h3 className="card-title">Latest Updates</h3>
                <p>Stay tuned for our newest products and innovations</p>
              </div>
            </div>
          </div>
          <button className="carousel-arrow right-arrow" onClick={() => scrollCarousel(1)}>&#10095;</button>
        </div>
      </section>

      <section className="section">
        <h2>Our Accreditation</h2>
        <div className="accreditation-scroll-wrapper">
          <div className="badge"><img src={iso1} alt="ISO Certified" /></div>
          <div className="badge"><img src={iso2} alt="ISO Certified" /></div>
          <div className="badge"><img src={who} alt="WHO GMP Certified" /></div>
          <div className="badge"><img src={accediate3} alt="Accreditation 3" /></div>
          <div className="badge"><img src={accediate4} alt="Accreditation 4" /></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
