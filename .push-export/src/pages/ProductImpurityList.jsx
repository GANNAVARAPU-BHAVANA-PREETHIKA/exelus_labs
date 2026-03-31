import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBrowseProducts, getBrowseLetterKey, isSupabaseConfigured } from '../services/productService';
import './ProductList.css';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getLetterLabel(letterParam) {
  const normalized = (letterParam || '').toLowerCase();
  if (normalized === 'others') return 'Others';

  const candidate = normalized.toUpperCase();
  return alphabet.includes(candidate) ? candidate : null;
}

const ProductImpurityList = () => {
  const { letter } = useParams();
  const letterLabel = getLetterLabel(letter);
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

  const impurities = useMemo(() => {
    if (!letterLabel) return [];

    return [...new Set(
      products
        .filter((product) => product.browse_letter === letterLabel)
        .map((product) => product.browse_label?.trim())
        .filter(Boolean)
    )];
  }, [letterLabel, products]);

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
        <span>{letterLabel}</span>
      </div>

      <div className="pl-header-bar">
        <div className="pl-header-left">
          <h2 className="pl-title">{letterLabel}</h2>
          {!loading && <span className="pl-count">({impurities.length})</span>}
        </div>
      </div>

      <div className="pl-actions-row">
        <Link className="pl-back-link" to="/products">Back to Alphabets</Link>
      </div>

      {error && (
        <div className="pl-error">
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="pl-browse-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="pl-browse-card pl-skeleton" key={index}>
              <div className="pl-skel-line medium" />
              <div className="pl-skel-line short" />
            </div>
          ))}
        </div>
      ) : impurities.length === 0 ? (
        <div className="pl-empty">
          <p>No entries found for {letterLabel === 'Others' ? '#' : letterLabel}.</p>
        </div>
      ) : (
        <div className="pl-browse-grid">
          {impurities.map((impurity) => {
            const relatedCount = products.filter((product) => product.browse_label?.trim() === impurity).length;

            return (
              <Link
                key={impurity}
                to={`/products/letter/${letterLabel.toLowerCase()}/impurity/${encodeURIComponent(impurity)}`}
                className="pl-browse-card"
              >
                <h3>{impurity} ({relatedCount})</h3>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductImpurityList;
