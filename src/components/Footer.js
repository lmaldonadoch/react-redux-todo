import React from 'react';
import FilterLink from './FilterLink';

const Footer = ({ onFilterClick }) => {
  return (
    <p>
      Show:{' '}
      <FilterLink filter="SHOW_ALL" onClick={onFilterClick}>
        All
      </FilterLink>{' '}
      <FilterLink filter="SHOW_ACTIVE" onClick={onFilterClick}>
        Active
      </FilterLink>{' '}
      <FilterLink filter="SHOW_COMPLETED" onClick={onFilterClick}>
        Completed
      </FilterLink>
    </p>
  );
};

export default Footer;
