import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import cookies from 'js-cookie';

import Loader from '../components/Loader';
import Auth from '../components/Auth';
import { verify } from '../actions/auth';
import { TOKEN } from '../actions/constants';

class AuthRoute extends Component {
  static propTypes = {
    handleVerify: PropTypes.func.isRequired,
    isLogged: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    routeComponent: PropTypes.element.isRequired,
  };

  componentDidMount() {
    const { handleVerify } = this.props;

    handleVerify(cookies.get(TOKEN));
  }

  render() {
    const { isLogged, routeComponent, isLoading } = this.props;

    if (!isLogged && isLoading) {
      return <Route {...this.props} render={() => <Loader />} />;
    }

    if (!isLogged) {
      return (
        <Route
          {...this.props}
          render={() => (
            <div>
              <h1 className="category-header__title">
                <div className="category-header__title-outer">
                  <div className="category-header__title-inner">Требуется авторизация</div>
                </div>
              </h1>
              <Auth />
            </div>
          )}
        />
      );
    }

    return (
      <Route {...this.props} render={() => <div>{React.createElement(routeComponent)}</div>} />
    );
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
