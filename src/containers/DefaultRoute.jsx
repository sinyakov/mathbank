import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import cookies from 'js-cookie';

import { verify } from '../actions/auth';
import { TOKEN } from '../actions/constants';

class DefaultRoute extends Component {
  static propTypes = {
    handleVerify: PropTypes.func.isRequired,
    isFirstAttempt: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { handleVerify, isFirstAttempt } = this.props;
    const token = cookies.get(TOKEN);

    if (token && isFirstAttempt) {
      handleVerify(token);
    }
  }

  render() {
    return <Route {...this.props} />;
  }
}

const mapStateToProps = ({ currentUser }) => ({
  isFirstAttempt: currentUser.isFirstAttempt,
});

const mapDispatchToProps = dispatch => ({
  handleVerify: token => dispatch(verify(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultRoute);
