import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cookies from 'js-cookie';
import { connect } from 'react-redux';
import { auth } from '../../actions/auth';
import { TOKEN } from '../../actions/constants';

const setToken = token => cookies.set(TOKEN, token);

const Form = styled.form`
  margin: 16px 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Input = styled.input`
  margin: 0 0 16px;
  padding: 6px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 2px #999;
  font-size: 18px;
`;

const Button = styled.button`
  display: block;
  padding: 4px 16px;
  border: none;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 1px #aaa;
  font-size: 17px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 180, 0.9);
  }

  &:active {
    background-color: rgba(255, 255, 140, 0.9);
    color: #000;
  }
`;

class Auth extends Component {
  static defaultProps = {
    onToggle: null,
    onError: null,
  };

  static propTypes = {
    handleAuth: PropTypes.func.isRequired,
    onToggle: PropTypes.func,
    onError: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  handleSubmit = (e) => {
    const { handleAuth, onToggle, onError } = this.props;

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
        if (onError) {
          onError();
        }
        Promise.reject(error);
      });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Wrapper>
          <Input
            value={this.state.login}
            type="text"
            name="login"
            placeholder="Логин"
            onChange={this.handleInputChange}
          />
          <Input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Пароль"
            onChange={this.handleInputChange}
          />
        </Wrapper>
        <Button type="submit">Войти</Button>
      </Form>
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
