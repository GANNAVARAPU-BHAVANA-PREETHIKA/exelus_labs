import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchBrowseProducts, getBrowseLetterKey, isSupabaseConfigured } from '../services/productService';
import './ProductList.css';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getUniqueProductCount(items) {
  const seen = new Set();

  items.forEach((product) => {
    const key = `${product.api_name || ''}::${product.cat_no || product.id || ''}`;
    seen.add(key);
  });

  return seen.size;
}

const ProductList = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('A');
  const searchQuery = new URLSearchParams(location.search).get('q')?.trim() || '';

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
              ? 'Unable to load impurity data from Supabase. Please check the table name, RLS policy, and env vars.'
              : 'Supabase is not configured. Add your REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY.'
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

  const letterCounts = useMemo(() => {
    const counts = Object.fromEntries([...alphabet, 'Others'].map((letter) => [letter, 0]));

    const uniqueImpurities = new Set(
      products
        .map((product) => product.browse_label?.trim())
        .filter(Boolean)
    );

    uniqueImpurities.forEach((impurity) => {
      const bucket = products.find((product) => product.browse_label === impurity)?.browse_letter || getBrowseLetterKey(impurity);
      counts[bucket] += 1;
    });

    return counts;
  }, [products]);

  const visibleImpurities = useMemo(() => {
    const activeLetter = selectedLetter || 'A';

    return [...new Set(
      products
        .filter((product) => product.browse_letter === activeLetter)
        .map((product) => product.browse_label?.trim())
        .filter(Boolean)
    )];
  }, [products, selectedLetter]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];

    const normalizedQuery = searchQuery.toLowerCase();

    return products.filter((product) =>
      [
        product.name,
        product.api_name,
        product.cas_no,
        product.cat_no,
        product.impurity,
        product.synonyms,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedQuery))
    );
  }, [products, searchQuery]);

  return (
    <div className="pl-page">
      <h2 className="pl-title">Our Products</h2>

      {error && (
        <div className="pl-error">
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="pl-letter-grid">
          {Array.from({ length: 27 }).map((_, index) => (
            <div className="pl-letter-card pl-skeleton" key={index}>
              <div className="pl-skel-line short" />
            </div>
          ))}
        </div>
      ) : searchQuery ? (
        <>
          <div className="pl-header-bar">
            <div className="pl-header-left">
              <h3 className="pl-title">Search Results</h3>
              <span className="pl-count">for "{searchQuery}"</span>
            </div>
          </div>
          <div className="pl-actions-row">
            <Link className="pl-back-link" to="/products">Back to Product Browse</Link>
          </div>
          {searchResults.length === 0 ? (
            <div className="pl-empty">
              <p>No products found for "{searchQuery}".</p>
            </div>
          ) : (
            <div className="pl-grid">
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  displayName={product.name || product.api_name}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
        <div className="pl-letter-grid">
          {[...alphabet, 'Others'].map((letter) => {
            const label = letter === 'Others' ? '#' : letter;

            return (
              <button
                type="button"
                key={letter}
                className={`pl-letter-card ${letterCounts[letter] === 0 ? 'disabled' : ''} ${selectedLetter === letter ? 'active' : ''}`}
                disabled={letterCounts[letter] === 0}
                aria-pressed={selectedLetter === letter}
                title={label}
                onClick={() => setSelectedLetter(letter)}
              >
                <span className="pl-letter-label">{label}</span>
              </button>
            );
          })}
        </div>
        <div className="pl-results-head">
          <h3 className="pl-results-title">
            {selectedLetter === 'Others' ? '#' : selectedLetter}
          </h3>
          <span className="pl-results-count">({visibleImpurities.length})</span>
        </div>
        {visibleImpurities.length === 0 ? (
          <div className="pl-empty">
            <p>No entries found for {selectedLetter === 'Others' ? '#' : selectedLetter}.</p>
          </div>
        ) : (
          <div className="pl-browse-grid">
            {visibleImpurities.map((impurity) => {
              const relatedProducts = products.filter(
                (product) =>
                  product.browse_letter === selectedLetter &&
                  product.browse_label?.trim() === impurity
              );
              const relatedCount = getUniqueProductCount(relatedProducts);

              return (
                <Link
                  key={impurity}
                  to={`/products/letter/${selectedLetter.toLowerCase()}/impurity/${encodeURIComponent(impurity)}`}
                  className="pl-browse-card"
                >
                  <h3>{impurity} ({relatedCount})</h3>
                </Link>
              );
            })}
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default ProductList;
