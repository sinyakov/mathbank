import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import cookies from 'js-cookie';

import Loader from '../components/Loader';
import Header from '../components/Header';
import Auth from '../components/Auth';
import { verify } from '../actions/auth';
import { TOKEN } from '../actions/constants';

class AuthRoute extends Component {
  static propTypes = {
    handleVerify: PropTypes.func.isRequired,
    isLogged: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { handleVerify } = this.props;

    handleVerify(cookies.get(TOKEN));
  }

  render() {
    const { isLogged, isLoading } = this.props;

    if (!isLogged && isLoading) {
      return <Route render={() => <Loader />} />;
    }

    if (!isLogged) {
      return (
        <Route
          render={() => (
            <div>
              <Header title="Требуется авторизация" showBackLink />
              <Auth />
            </div>
          )}
        />
      );
    }

    return <Route {...this.props} />;
  }
}

const mapStateToProps = ({ currentUser }) => ({
  isLogged: currentUser.isLogged,
  isLoading: currentUser.isLoading,
});

const mapDispatchToProps = dispatch => ({
  handleVerify: token => dispatch(verify(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
