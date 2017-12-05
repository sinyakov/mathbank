import axios from 'axios';
import config from '../config';
import { FETCH_HOMEWORK_START, FETCH_HOMEWORK_SUCCESS, FETCH_HOMEWORK_FAILURE } from './constants';

const shouldFetchHomework = (state, id) =>
  !state.homeworks[id] ||
  (state.homeworks[id] && !state.homeworks[id].isLoading && state.homeworks[id].list);

export const getHomework = id => (dispatch, getState) => {
  if (shouldFetchHomework(getState(), id)) {
    dispatch({
      type: FETCH_HOMEWORK_START,
      payload: id,
    });

    return axios
      .get(`${config.base_url}/homework/entry/${id}`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_HOMEWORK_SUCCESS,
          payload: { ...data, id },
        });
        return Promise.resolve(data);
      })
      .catch((error) => {
        dispatch({
          type: FETCH_HOMEWORK_FAILURE,
          payload: { error, id },
        });
        return Promise.reject(error);
      });
  }
  return Promise.resolve();
};

export const addHomework = () => {};
