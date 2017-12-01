import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HeaderLink } from './Styled';

const BasketCounter = ({ basketCount, isAdmin }) =>
  isAdmin && (
    <HeaderLink right to="/basket" title="Новое домашнее задание">
      {basketCount}
    </HeaderLink>
  );

BasketCounter.propTypes = {
  basketCount: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ basket, currentUser }) => ({
  basketCount: basket.list.length,
  isAdmin: currentUser.user ? currentUser.user.isAdmin : false,
});

export default connect(mapStateToProps)(BasketCounter);
