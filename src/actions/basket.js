import axios from 'axios';
import config from '../config';

import {
  ADD_PROBLEM_TO_BASKET,
  REMOVE_PROBLEM_FROM_BASKET,
  REORDER_PROBLEMS_IN_BASKET,
  CLEAR_BASKET,
  CREATE_HOMEWORK_START,
  CREATE_HOMEWORK_SUCCESS,
  CREATE_HOMEWORK_FAILURE,
  TOKEN,
} from '../actions/constants';

export const reorderProblems = orderedList => ({
  type: REORDER_PROBLEMS_IN_BASKET,
  payload: orderedList,
});

export const addProblemToBasket = problem => ({
  type: ADD_PROBLEM_TO_BASKET,
  payload: problem,
});

export const removeProblemFromBasket = problem => ({
  type: REMOVE_PROBLEM_FROM_BASKET,
  payload: problem,
});

export const clearBasket = () => ({
  type: CLEAR_BASKET,
});

export const createHomeworkSuccess = data => ({
  type: CREATE_HOMEWORK_SUCCESS,
  payload: data,
});

export const createHomeworkFailure = error => ({
  type: CREATE_HOMEWORK_FAILURE,
  payload: error,
});

export const createHomework = (token, homework) => (dispatch) => {
  dispatch({
    type: CREATE_HOMEWORK_START,
  });

  return axios({
    url: `${config.base_url}/homework/entry`,
    method: 'POST',
    data: homework,
    headers: {
      [TOKEN]: token,
    },
  })
    .then(({ data }) => {
      dispatch(createHomeworkSuccess(data));
      dispatch(clearBasket());
      return Promise.resolve(data);
    })
    .catch((error) => {
      const { response } = error;
      if (response) {
        if (response.status === 500) {
          dispatch(createHomeworkFailure(response.data));
        } else if (response.status === 406) {
          dispatch(createHomeworkFailure('Ошибка при валидации'));
        } else {
          dispatch(createHomeworkFailure('Неизвестная ошибка'));
        }
      } else {
        dispatch(createHomeworkFailure('Не удалось соединиться с сервером'));
      }
      return Promise.reject(error);
    });
};
