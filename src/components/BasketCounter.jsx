import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from './Modal';
import Auth from './Auth';

const renderModalHandler = () => (
  <button className="login-button" type="button" title="Авторизация">
    ?
  </button>
);

const BasketCounter = ({ basketCount, isAdmin }) =>
  (isAdmin ? (
    <NavLink className="basket-count" to="/basket" title="Новое домашнее задание">
      {basketCount}
    </NavLink>
  ) : (
    <Modal title="Авторизация" handler={renderModalHandler()}>
      <Auth />
    </Modal>
  ));

BasketCounter.propTypes = {
  basketCount: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ basket, currentUser }) => ({
  basketCount: basket.list.length,
  isAdmin: currentUser.user ? currentUser.user.isAdmin : false,
});

export default connect(mapStateToProps)(BasketCounter);
