import axios from 'axios';
import config from '../config';
import { getProblemsByCategoryId } from './catalog';

import {
  REODRED_CATEGORY_PROBLEMS_START,
  REODRED_CATEGORY_PROBLEMS_FAILURE,
  REODRED_CATEGORY_PROBLEMS_SUCCESS,
  TOKEN,
} from './constants';

const reorderCategoryProblemsStart = (categoryId, problemsList) => ({
  type: REODRED_CATEGORY_PROBLEMS_START,
  payload: {
    categoryId,
    problemsList,
  },
});

const reorderCategoryProblemsSuccess = () => ({
  type: REODRED_CATEGORY_PROBLEMS_SUCCESS,
});

const reorderCategoryProblemsFailure = error => ({
  type: REODRED_CATEGORY_PROBLEMS_FAILURE,
  payload: error,
});

export default (token, categoryId, problemsList) => (dispatch) => {
  dispatch(reorderCategoryProblemsStart());
  return axios({
    url: `${config.base_url}/category/entries/${categoryId}`,
    method: 'PUT',
    data: { id: categoryId, list: problemsList.map(p => p.id) },
    headers: {
      [TOKEN]: token,
    },
  })
    .then(() => {
      dispatch(reorderCategoryProblemsSuccess());
      return dispatch(getProblemsByCategoryId(categoryId));
    })
    .catch((error) => {
      const { response } = error;
      if (response) {
        dispatch(reorderCategoryProblemsFailure(response.data.message));
      } else {
        dispatch(reorderCategoryProblemsFailure('Не удалось соединиться с сервером'));
      }
      return Promise.reject(error);
    });
};
