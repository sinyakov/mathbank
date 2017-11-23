import axios from 'axios';
import config from '../config';
import { TOKEN, AUTH_START, AUTH_SUCCESS, AUTH_FAILURE } from './constants';

const authStart = () => ({
  type: AUTH_START,
});

const authSuccess = user => ({
  type: AUTH_SUCCESS,
  payload: user,
});

const authFailure = err => ({
  type: AUTH_FAILURE,
  payload: err,
});

const shouldAuth = state =>
  !state.currentUser.isLoading && !state.currentUser.isLogged && !state.currentUser.user;

export const auth = (login, password) => (dispatch, getState) => {
  if (shouldAuth(getState())) {
    dispatch(authStart());
    return axios({
      url: `${config.base_url}/user/signin`,
      data: { login, password },
      method: 'POST',
    })
      .then(({ data }) => {
        dispatch(authSuccess(data.user));
        return Promise.resolve(data.token);
      })
      .catch((error) => {
        const { response } = error;

        if (response) {
          if (response.status === 403) {
            dispatch(authFailure('Неверный пароль'));
          } else if (response.status === 500) {
            dispatch(authFailure('Внутренняя ошибка сервера'));
          } else if (response.status === 404) {
            dispatch(authFailure('Пользователь не найден'));
          } else {
            dispatch(authFailure('Неизвестная ошибка сервера'));
          }
        } else {
          dispatch(authFailure('Не удалось соединиться с сервером'));
        }

        return Promise.reject(error);
      });
  }
  return Promise.resolve();
};

const verifyStart = () => ({
  type: AUTH_START,
});

const verifyFailure = err => ({
  type: AUTH_FAILURE,
  payload: err,
});

export const verify = token => (dispatch) => {
  dispatch(verifyStart());
  return axios({
    url: `${config.base_url}/user/verify`,
    method: 'GET',
    headers: {
      [TOKEN]: token,
    },
  })
    .then(({ data }) => {
      dispatch(authSuccess(data));
      return Promise.resolve(data);
    })
    .catch((error) => {
      const { response } = error;
      if (response) {
        if (response.status === 401) {
          dispatch(verifyFailure('Неверный токен'));
        } else {
          dispatch(verifyFailure('Неизвестная ошибка токена'));
        }
      } else {
        dispatch(verifyFailure('Не удалось соединиться с сервером'));
      }

      return Promise.reject(error);
    });
};
