import axios from 'axios';
import config from '../config';
import { fetchCategoryProblemsSuccess } from './catalog';
import { removeProblemFromBasket } from './basket';

import {
  REMOVE_PROBLEM_START,
  REMOVE_PROBLEM_SUCCESS,
  REMOVE_PROBLEM_FAILURE,
  TOKEN,
} from './constants';

const removeProblemStart = problem => ({
  type: REMOVE_PROBLEM_START,
  payload: problem,
});

const removeProblemSuccess = () => ({
  type: REMOVE_PROBLEM_SUCCESS,
});

const removeProblemFailure = error => ({
  type: REMOVE_PROBLEM_FAILURE,
  payload: error,
});

const shouldPostProblem = state => !state.deleteProblem.isHydrating;
const getProblemList = (state, categoryId) => state.problems[categoryId].list;

export default (token, problem) => (dispatch, getState) => {
  if (shouldPostProblem(getState())) {
    const list = getProblemList(getState(), problem.category);

    dispatch(removeProblemStart());
    return axios({
      url: `${config.base_url}/problem/entries/${problem.id}`,
      method: 'DELETE',
      headers: {
        [TOKEN]: token,
      },
    })
      .then(() => {
        dispatch(removeProblemSuccess());
        const updatedList = list.filter(p => p.id !== problem.id);
        dispatch(fetchCategoryProblemsSuccess(problem.category, updatedList));
        dispatch(removeProblemFromBasket(problem.id));

        return Promise.resolve();
      })
      .catch((error) => {
        const { response } = error;
        if (response) {
          dispatch(removeProblemFailure(response.data.message));
        } else {
          dispatch(removeProblemFailure('Не удалось соединиться с сервером'));
        }
        return Promise.reject(error);
      });
  }
  return Promise.resolve();
};
