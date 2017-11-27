import axios from 'axios';
import config from '../config';
import { fetchCategoryProblemsSuccess } from './catalog';
import { addProblemToBasket, removeProblemFromBasket } from './basket';

import {
  UPDATE_PROBLEM_START,
  UPDATE_PROBLEM_SUCCESS,
  UPDATE_PROBLEM_FAILURE,
  TOKEN,
} from './constants';

const postNewProblemStart = () => ({
  type: UPDATE_PROBLEM_START,
});

const postNewProblemSuccess = () => ({
  type: UPDATE_PROBLEM_SUCCESS,
});

const postNewProblemFailure = error => ({
  type: UPDATE_PROBLEM_FAILURE,
  payload: error,
});

const shouldPostProblem = state => !state.postProblem.isHydrating;

const getProblemList = (state, categoryId) =>
  (state.problems[categoryId] ? state.problems[categoryId].list : false);

export default (token, problem, prevCategoryId) => (dispatch, getState) => {
  if (shouldPostProblem(getState())) {
    dispatch(postNewProblemStart());
    return axios({
      url: `${config.base_url}/problem/entries/${problem.id}`,
      method: 'PUT',
      data: { problem },
      headers: {
        [TOKEN]: token,
      },
    })
      .then(({ data }) => {
        console.log(data);
        dispatch(postNewProblemSuccess());
        const newCategoryList = getProblemList(getState(), problem.category);
        const prevCategoryList = getProblemList(getState(), prevCategoryId);

        if (prevCategoryList) {
          const indexOfProblem = prevCategoryList.findIndex(p => p.id === problem.id);

          if (problem.category === prevCategoryId) {
            dispatch(fetchCategoryProblemsSuccess(prevCategoryId, [
              ...prevCategoryList.slice(0, indexOfProblem),
              data,
              ...prevCategoryList.slice(indexOfProblem + 1),
            ]));
          } else {
            dispatch(fetchCategoryProblemsSuccess(prevCategoryId, [
              ...prevCategoryList.slice(0, indexOfProblem),
              ...prevCategoryList.slice(indexOfProblem + 1),
            ]));

            if (newCategoryList) {
              dispatch(fetchCategoryProblemsSuccess(problem.category, [...newCategoryList, data]));
            }
          }
        }

        if (getState().basket.list.find(p => p.id === problem.id)) {
          dispatch(removeProblemFromBasket(problem.id));
          dispatch(addProblemToBasket(problem));
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
