import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_PRODUCT_IMAGE } from '../services/productService';

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23e8eaf6"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="12" fill="%233d3b8e">No Image</text></svg>';

const ProductCard = ({ product, displayName }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const details = [
    ...(product.api_name && product.api_name !== product.impurity
      ? [{ label: 'API Name', value: product.api_name }]
      : []),
    { label: 'CAS No', value: product.cas_no },
    { label: 'CAT No', value: product.cat_no },
    { label: 'IUPAC Name', value: product.iupac_name },
    { label: 'Molecular Formula', value: product.molecular_formula },
    { label: 'Molecular Weight', value: product.molecular_weight },
    { label: 'Storage', value: product.storage },
    { label: 'Synonyms', value: product.synonims || product.synonyms },
    { label: 'Availability', value: product.availability, isBadge: true },
  ];

  return (
    <div
      className="pl-product-card"
      onClick={() => navigate(`/products/${product.cat_no}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/products/${product.cat_no}`)}
      aria-label={`View details for ${displayName}`}
    >
      <div className="pl-card-img-wrap">
        <img
          src={imgError ? FALLBACK_IMAGE : product.image_url || DEFAULT_PRODUCT_IMAGE}
          alt={displayName}
          className="pl-card-img"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>
      <div className="pl-card-body">
        <h4 className="pl-card-name" title={displayName}>{displayName}</h4>
        <div className="pl-card-details">
          {details.map((item) => (
            <div className="pl-card-row" key={item.label}>
              <span className="pl-card-label">{item.label}</span>
              <span className="pl-card-value">
                {item.isBadge ? (
                  <span className={`pl-card-avail ${item.value === 'In Stock' ? 'instock' : 'ondemand'}`}>
                    {item.value || '-'}
                  </span>
                ) : (
                  item.value || '-'
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="pl-card-footer">
          <span className="pl-card-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
