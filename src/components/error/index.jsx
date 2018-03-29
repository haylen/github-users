import React from 'react';
import PropTypes from 'prop-types';

import './index.scss'

const Error = ({ error }) => (
  <div className="Error">
    {error}
  </div>
);

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;
