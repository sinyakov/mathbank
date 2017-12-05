import axios from 'axios';
import config from '../config';
import { fetchCategoryProblemsSuccess } from './catalog';

import {
  POST_NEW_PROBLEM_START,
  POST_NEW_PROBLEM_SUCCESS,
  POST_NEW_PROBLEM_FAILURE,
  TOKEN,
} from './constants';

const postNewProblemStart = () => ({
  type: POST_NEW_PROBLEM_START,
});

const postNewProblemSuccess = () => ({
  type: POST_NEW_PROBLEM_SUCCESS,
});

const postNewProblemFailure = error => ({
  type: POST_NEW_PROBLEM_FAILURE,
  payload: error,
});

const shouldPostProblem = state => !state.postProblem.isHydrating;

const getProblemList = (state, categoryId) =>
  (state.problems[categoryId] ? state.problems[categoryId].list : false);

export default (token, problem) => (dispatch, getState) => {
  if (shouldPostProblem(getState())) {
    const list = getProblemList(getState(), problem.category);

    dispatch(postNewProblemStart());
    return axios({
      url: `${config.base_url}/problem/entries`,
      method: 'POST',
      data: { problem },
      headers: {
        [TOKEN]: token,
      },
    })
      .then(({ data }) => {
        dispatch(postNewProblemSuccess());
        if (list) {
          dispatch(fetchCategoryProblemsSuccess(problem.category, [...list, data]));
        }
        return Promise.resolve();
      })
      .catch((error) => {
        const { response } = error;
        if (response) {
          dispatch(postNewProblemFailure(response.data.message));
        } else {
          dispatch(postNewProblemFailure('Не удалось соединиться с сервером'));
        }
        return Promise.reject(error);
      });
  }
  return Promise.resolve();
};
