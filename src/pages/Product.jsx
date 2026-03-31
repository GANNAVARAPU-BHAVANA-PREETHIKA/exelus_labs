// src/pages/Product.jsx
import React, { useState } from 'react';
import './Product.css';

const categories = ['Impurities', 'Stable Isotopes', 'Nitrosamine'];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const others = ['Others'];
const products = {
  A: ['Abacavir', 'Abiraterone Acetate', 'Acebutalol', 'Aceclofenac', 'Atenolol', 'Azithromycin'],
  // Add more letters and products as needed
};

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState('Impurities');
  const [selectedLetter, setSelectedLetter] = useState('A');

  return (
    <div className="product-page">
      <h2 className="title">Impurities</h2>

      <div className="alphabet-filter">
        {[...alphabet, ...others].map(letter => (
          <button
            key={letter}
            className={selectedLetter === letter ? 'active' : ''}
            onClick={() => setSelectedLetter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="content">
        <div className="sidebar">
          <h3>Categories</h3>
          <ul>
            {categories.map(cat => (
              <li
                key={cat}
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="product-list">
          {(products[selectedLetter] || []).map((product, index) => (
            <div className="product-card" key={index}>
              {product}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
