import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../Modal';
import Auth from '../Auth';
import { HeaderButton } from './Styled';

const renderModalHandler = () => (
  <HeaderButton type="button" title="Авторизация">
    ?
  </HeaderButton>
);

const BasketCounter = ({ isAdmin }) =>
  (isAdmin ? null : (
    <Modal title="Авторизация" handler={renderModalHandler()}>
      <Auth />
    </Modal>
  ));

BasketCounter.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ currentUser }) => ({
  isAdmin: currentUser.user ? currentUser.user.isAdmin : false,
});

export default connect(mapStateToProps)(BasketCounter);
