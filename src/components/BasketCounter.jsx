import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const BasketCounter = ({ basketCount, isAdmin }) =>
  isAdmin && (
    <NavLink className="basket-count" to="/basket" title="Новое домашнее задание">
      {basketCount}
    </NavLink>
  );

BasketCounter.propTypes = {
  basketCount: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ basket, user }) => ({
  basketCount: basket.list.length,
  isAdmin: user.isAdmin,
});

export default connect(mapStateToProps)(BasketCounter);
