import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DEFAULT_PRODUCT_IMAGE, fetchProductByCatNo, isSupabaseConfigured } from '../services/productService';
import './ProductDetails.css';

const ProductDetail = () => {
  const { code } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    setImageError(false);

    async function loadProduct() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchProductByCatNo(code);

        if (!isMounted) return;

        if (!data) {
          setProduct(null);
          setError('Product not found.');
          return;
        }

        setProduct(data);
      } catch (err) {
        if (!isMounted) return;
        setProduct(null);
        setError(
          isSupabaseConfigured()
            ? 'Unable to load this product from Supabase.'
            : 'Supabase is not configured.'
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [code]);

  if (loading) {
    return (
      <div className="pd-not-found">
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-not-found">
        <h2>{error || 'Product Not Found'}</h2>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  const rows = [
    { label: 'API Name', value: product.api_name },
    { label: 'CAT. No', value: product.cat_no },
    { label: 'CAS. No', value: product.cas_no },
    { label: 'IUPAC Name', value: product.iupac_name },
    { label: 'Mol. Formula', value: product.molecular_formula },
    { label: 'Mol. Weight', value: product.molecular_weight },
    { label: 'Storage', value: product.storage },
    { label: 'Synonyms', value: product.synonyms },
    { label: 'Stock Status', value: product.availability, badge: true },
  ];

  const productImage = imageError ? DEFAULT_PRODUCT_IMAGE : product.image_url || DEFAULT_PRODUCT_IMAGE;

  const openImageModal = () => {
    setImageZoom(1);
    setShowImageModal(true);
  };

  const zoomInImage = () => setImageZoom((currentZoom) => Math.min(currentZoom + 0.25, 3));
  const zoomOutImage = () => setImageZoom((currentZoom) => Math.max(currentZoom - 0.25, 0.75));
  const resetImageZoom = () => setImageZoom(1);

  return (
    <div className="pd-wrapper">
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link>
        <span>&gt;</span>
        <Link to="/products">Our Products</Link>
        <span>&gt;</span>
        <span className="pd-bread-current">{product.name}</span>
      </div>

      <div className="pd-container">
        <div className="pd-image-col">
          <button type="button" className="pd-image-box pd-image-trigger" onClick={openImageModal}>
            <img
              src={productImage}
              alt={product.name}
              className="pd-image"
              onError={() => setImageError(true)}
            />
            <span className="pd-image-hint">Click to zoom</span>
          </button>
        </div>

        <div className="pd-info-col">
          <h1 className="pd-product-name">{product.name}</h1>

          <div className="pd-actions">
            <button className="pd-btn pd-btn-enquiry" onClick={() => setShowModal(true)}>
              Enquiry
            </button>
            <a
              href={`https://wa.me/917989540212?text=${encodeURIComponent(`Hi, I am interested in ${product.name} (${product.cat_no})`)}`}
              target="_blank"
              rel="noreferrer"
              className="pd-btn pd-btn-whatsapp"
            >
              WhatsApp
            </a>
          </div>

          <table className="pd-info-table">
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="pd-label">{row.label}</td>
                  <td className="pd-value">
                    {row.badge ? (
                      <span className={`pd-badge ${row.value === 'In Stock' ? 'instock' : 'ondemand'}`}>
                        {row.value}
                      </span>
                    ) : (
                      row.value || '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showImageModal && (
        <div
          className="pd-image-modal-overlay"
          onClick={() => setShowImageModal(false)}
        >
          <div className="pd-image-modal" onClick={(event) => event.stopPropagation()}>
            <div className="pd-image-toolbar">
              <span className="pd-image-zoom-label">{Math.round(imageZoom * 100)}%</span>
              <div className="pd-image-controls">
                <button type="button" className="pd-image-control-btn" onClick={zoomOutImage}>-</button>
                <button type="button" className="pd-image-control-btn" onClick={resetImageZoom}>Reset</button>
                <button type="button" className="pd-image-control-btn" onClick={zoomInImage}>+</button>
                <button type="button" className="pd-image-control-btn pd-image-close-btn" onClick={() => setShowImageModal(false)}>
                  Close
                </button>
              </div>
            </div>
            <div className="pd-image-modal-stage">
              <img
                src={productImage}
                alt={product.name}
                className="pd-image-modal-img"
                style={{ transform: `scale(${imageZoom})` }}
                onError={() => setImageError(true)}
              />
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="pd-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pd-modal" onClick={(event) => event.stopPropagation()}>
            <h3>Enquiry - {product.name}</h3>
            <form
              className="pd-form"
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const name = formData.get('name')?.toString().trim() || '';
                const email = formData.get('email')?.toString().trim() || '';
                const phone = formData.get('phone')?.toString().trim() || '';
                const company = formData.get('company')?.toString().trim() || '';
                const message = formData.get('message')?.toString().trim() || '';
                const subject = `Enquiry for ${product.name} (${product.cat_no})`;
                const body = [
                  `Name: ${name}`,
                  `Email: ${email}`,
                  `Phone: ${phone || '-'}`,
                  `Organisation / Company: ${company || '-'}`,
                  `Product: ${product.name}`,
                  `CAT. No: ${product.cat_no || '-'}`,
                  '',
                  'Message:',
                  message,
                ].join('\n');

                window.location.href = `mailto:info@exeluslabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                setShowModal(false);
              }}
            >
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <input type="tel" name="phone" placeholder="Your Phone Number" />
              <input type="text" name="company" placeholder="Organisation / Company" />
              <textarea name="message" placeholder="Your message or quantity required" rows="4" required />
              <div className="pd-form-btns">
                <button type="submit" className="pd-btn pd-btn-enquiry">Submit Enquiry</button>
                <button type="button" className="pd-btn pd-btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
