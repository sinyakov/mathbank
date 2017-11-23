import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookies from 'js-cookie';
import { connect } from 'react-redux';
import { auth } from '../../actions/auth';
import { TOKEN } from '../../actions/constants';

const setToken = token => cookies.set(TOKEN, token);

class Auth extends Component {
  static defaultProps = {
    onToggle: null,
    error: '',
  };

  static propTypes = {
    handleAuth: PropTypes.func.isRequired,
    onToggle: PropTypes.func,
    error: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  handleSubmit = (e) => {
    const { handleAuth, onToggle } = this.props;

    e.preventDefault();
    handleAuth(this.state.login, this.state.password)
      .then((token) => {
        setToken(token);
        return true;
      })
      .then(() => {
        if (onToggle) {
          onToggle();
        }
        Promise.resolve();
      })
      .catch((error) => {
        Promise.reject(error);
      });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { error } = this.props;

    return (
      <div>
        <form className="auth__form" onSubmit={e => this.handleSubmit(e)}>
          <div className="auth__inputs">
            <input
              value={this.state.login}
              type="text"
              name="login"
              placeholder="Логин"
              onChange={this.handleInputChange}
              className="auth__input"
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Пароль"
              onChange={this.handleInputChange}
              className="auth__input"
            />
          </div>
          <button type="submit" className="primary-button">
            Войти
          </button>
        </form>
        <p className="auth__error">{error}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ currentUser }) => ({
  error: currentUser.error,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleAuth: (login, password) => {
    if (ownProps.onAuth) {
      ownProps.onAuth();
    }
    return dispatch(auth(login, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
