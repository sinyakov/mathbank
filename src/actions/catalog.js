import axios from 'axios';
import config from '../config';
import {
  FETCH_CATEGORIES_LIST_START,
  FETCH_CATEGORIES_LIST_SUCCESS,
  FETCH_CATEGORIES_LIST_FAILURE,
  FETCH_CATEGORY_PROBLEMS_START,
  FETCH_CATEGORY_PROBLEMS_SUCCESS,
  FETCH_CATEGORY_PROBLEMS_FAILURE,
} from './constants';

export const getCategories = () => (dispatch) => {
  dispatch({
    type: FETCH_CATEGORIES_LIST_START,
  });

  return axios
    .get(`${config.base_url}/category/entries`)
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
    .get(`${config.base_url}/category/entries/${id}`)
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
