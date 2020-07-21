import React from 'react';

const FilterLink = ({ filter, children, onClick }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick(filter);
      }}
    >
      {children}
    </button>
  );
};

export default FilterLink;
