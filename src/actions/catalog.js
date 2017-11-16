import axios from 'axios';
import {
  FETCH_CATEGORIES_LIST_START,
  FETCH_CATEGORIES_LIST_SUCCESS,
  FETCH_CATEGORIES_LIST_FAILURE,
  FETCH_CATEGORY_PROBLEMS_START,
  FETCH_CATEGORY_PROBLEMS_SUCCESS,
  FETCH_CATEGORY_PROBLEMS_FAILURE,
} from './constants';

const BASE_URL = 'http://188.226.171.191:3000/api';

export const getCategories = () => (dispatch) => {
  dispatch({
    type: FETCH_CATEGORIES_LIST_START,
  });

  return axios
    .get(`${BASE_URL}/categories`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_CATEGORIES_LIST_SUCCESS,
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      dispatch({
        type: FETCH_CATEGORIES_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getProblemsByCategoryId = (id, hash) => (dispatch) => {
  dispatch({
    type: FETCH_CATEGORY_PROBLEMS_START,
    payload: hash,
  });

  return axios
    .get(`${BASE_URL}/problems/${id}`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_CATEGORY_PROBLEMS_SUCCESS,
        payload: {
          category: hash,
          list: data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_CATEGORY_PROBLEMS_FAILURE,
        payload: err,
      });
    });
};
