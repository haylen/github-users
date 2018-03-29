import React from 'react';
import PropTypes from 'prop-types';

import './index.scss'

const LoadMoreBtn = ({ onClick }) => (
  <button onClick={onClick} className="LoadMoreBtn">
    Load more
  </button>
);

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
