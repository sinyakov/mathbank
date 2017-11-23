import axios from 'axios';
import config from '../config';
import { FETCH_HOMEWORK_START, FETCH_HOMEWORK_SUCCESS, FETCH_HOMEWORK_FAILURE } from './constants';

export const getHomework = id => (dispatch) => {
  dispatch({
    type: FETCH_HOMEWORK_START,
    payload: id,
  });

  return axios
    .get(`${config.base_url}/homeworks/${id}`)
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
