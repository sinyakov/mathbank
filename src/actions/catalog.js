import axios from 'axios';
import {
  FETCH_CATEGORIES_LIST_START,
  FETCH_CATEGORIES_LIST_SUCCESS,
  FETCH_CATEGORIES_LIST_FAILURE,
  FETCH_CATEGORY_PROBLEMS_START,
  FETCH_CATEGORY_PROBLEMS_SUCCESS,
  FETCH_CATEGORY_PROBLEMS_FAILURE,
} from './constants';

const BASE_URL = 'http://127.0.0.1:3012';

export const getCategories = () => (dispatch) => {
  dispatch({
    type: FETCH_CATEGORIES_LIST_START,
  });

  return axios
    .get(`${BASE_URL}/category/entries`)
    .then(({ data }) =>
      new Promise((resolve) => {
        setTimeout(() => {
          dispatch({
            type: FETCH_CATEGORIES_LIST_SUCCESS,
            payload: data,
          });
          resolve(data);
        }, 10);
      }))
    .catch((err) => {
      dispatch({
        type: FETCH_CATEGORIES_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getProblemsByCategoryId = id => (dispatch) => {
  dispatch({
    type: FETCH_CATEGORY_PROBLEMS_START,
    payload: id,
  });

  return axios
    .get(`${BASE_URL}/category/entries/${id}`)
    .then(({ data: { list } }) => {
      setTimeout(() => {
        dispatch({
          type: FETCH_CATEGORY_PROBLEMS_SUCCESS,
          payload: {
            id,
            list,
          },
        });
      }, 10);
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CATEGORY_PROBLEMS_FAILURE,
        payload: {
          id,
          error,
        },
      });
    });
};
