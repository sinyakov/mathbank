import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ children }) => <div className="loader">{children}</div>;

Loader.defaultProps = {
  children: 'Загрузка',
};

Loader.propTypes = {
  children: PropTypes.string,
};

export default Loader;
