import React, { createContext, useEffect, useState } from 'react';
import { fetchSearchProducts, isSupabaseConfigured } from '../services/productService';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      if (!isSupabaseConfigured()) {
        if (isMounted) setProducts([]);
        return;
      }

      try {
        const data = await fetchSearchProducts();
        if (isMounted) setProducts(data);
      } catch {
        if (isMounted) setProducts([]);
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
