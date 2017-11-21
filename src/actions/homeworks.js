import axios from 'axios';
import { FETCH_HOMEWORK_START, FETCH_HOMEWORK_SUCCESS, FETCH_HOMEWORK_FAILURE } from './constants';

const BASE_URL = 'http://127.0.0.1:3012/api';

export const getHomework = id => (dispatch) => {
  dispatch({
    type: FETCH_HOMEWORK_START,
    payload: id,
  });

  return axios
    .get(`${BASE_URL}/homeworks/${id}`)
    .then(({ data }) =>
      setTimeout(() => {
        dispatch({
          type: FETCH_HOMEWORK_SUCCESS,
          payload: { ...data, id },
        });
      }, 20))
    .catch((error) => {
      setTimeout(() => {
        dispatch({
          type: FETCH_HOMEWORK_FAILURE,
          payload: { error, id },
        });
      }, 20);
    });
};

export const addHomework = () => {};
