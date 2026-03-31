import React, { useRef } from 'react';

const SearchBar = ({ value, onChange, placeholder }) => {
  const inputRef = useRef(null);

  return (
    <div className="pl-search-bar">
      <span className="pl-search-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        ref={inputRef}
        type="text"
        className="pl-search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search by name or CAS number...'}
        aria-label="Search products"
      />
      {value && (
        <button className="pl-search-clear" onClick={() => { onChange(''); inputRef.current?.focus(); }} aria-label="Clear search">
          &times;
        </button>
      )}
    </div>
  );
};

export default SearchBar;
