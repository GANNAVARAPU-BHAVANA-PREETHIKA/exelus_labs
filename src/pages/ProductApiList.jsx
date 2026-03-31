import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchBrowseProducts, isSupabaseConfigured } from '../services/productService';
import './ProductList.css';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getLetterLabel(letterParam) {
  const normalized = (letterParam || '').toLowerCase();
  if (normalized === 'others') return 'Others';

  const candidate = normalized.toUpperCase();
  return alphabet.includes(candidate) ? candidate : null;
}

const ProductApiList = () => {
  const { letter, impurityName } = useParams();
  const letterLabel = getLetterLabel(letter);
  const impurity = impurityName || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchBrowseProducts();
        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            isSupabaseConfigured()
              ? 'Unable to load impurity data from Supabase.'
              : 'Supabase is not configured.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (!letterLabel || !impurity) return [];

    return products.filter(
      (product) =>
        product.browse_letter === letterLabel &&
        product.browse_label?.trim() === impurity
    );
  }, [impurity, letterLabel, products]);

  const uniqueApiProducts = useMemo(() => {
    const seen = new Set();

    return filteredProducts.filter((product) => {
      const key = `${product.api_name}::${product.cat_no}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [filteredProducts]);

  if (!letterLabel) {
    return (
      <div className="pl-page">
        <div className="pl-empty">
          <p>Invalid alphabet selection.</p>
          <Link className="pl-back-link" to="/products">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pl-page">
      <div className="pl-breadcrumb">
        <Link to="/">Home</Link>
        <span>&gt;</span>
        <Link to="/products">Products</Link>
        <span>&gt;</span>
        <Link to={`/products/letter/${letterLabel.toLowerCase()}`}>{letterLabel}</Link>
        <span>&gt;</span>
        <span>{impurity}</span>
      </div>

      <div className="pl-header-bar">
        <div className="pl-header-left">
          <h2 className="pl-title">{impurity}</h2>
          {!loading && <span className="pl-count">{uniqueApiProducts.length} API entries</span>}
        </div>
      </div>

      <div className="pl-actions-row">
        <Link className="pl-back-link" to={`/products/letter/${letterLabel.toLowerCase()}`}>
          Back to {letterLabel} Impurities
        </Link>
      </div>

      {error && (
        <div className="pl-error">
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="pl-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="pl-product-card pl-skeleton" key={index}>
              <div className="pl-card-img-wrap pl-skel-img" />
              <div className="pl-card-body">
                <div className="pl-skel-line short" />
                <div className="pl-skel-line" />
                <div className="pl-skel-line medium" />
              </div>
            </div>
          ))}
        </div>
      ) : uniqueApiProducts.length === 0 ? (
        <div className="pl-empty">
          <p>No products found for this entry.</p>
        </div>
      ) : (
        <div className="pl-grid">
          {uniqueApiProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              displayName={product.name || product.api_name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductApiList;
