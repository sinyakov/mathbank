import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const BasketCounter = ({ basketCount }) => (
  <NavLink className="basket-count" to="/basket" title="Новое домашнее задание">
    {basketCount}
  </NavLink>
);

BasketCounter.propTypes = {
  basketCount: PropTypes.number.isRequired,
};

const mapStateToProps = ({ basket }) => ({
  basketCount: basket.list.length,
});

export default connect(mapStateToProps)(BasketCounter);
