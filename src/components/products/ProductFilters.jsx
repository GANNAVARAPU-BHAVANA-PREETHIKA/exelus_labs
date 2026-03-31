import React from 'react';

const AVAILABILITY_OPTIONS = [
  { value: '', label: 'All Availability' },
  { value: 'In Stock', label: 'In Stock' },
  { value: 'Out of Stock', label: 'Out of Stock' },
];

const ProductFilters = ({ availability, onAvailabilityChange }) => {
  return (
    <div className="pl-filters">
      <div className="pl-filter-group">
        <label className="pl-filter-label" htmlFor="availability-select">Availability</label>
        <select
          id="availability-select"
          className="pl-filter-select"
          value={availability}
          onChange={(e) => onAvailabilityChange(e.target.value)}
        >
          {AVAILABILITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;
