import {
  FETCH_CATEGORIES_LIST_START,
  FETCH_CATEGORIES_LIST_SUCCESS,
  FETCH_CATEGORIES_LIST_FAILURE,
} from '../actions/constants';

const defaultState = {
  isLoading: false,
  currentCategory: null,
  list: [],
  errors: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CATEGORIES_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    case FETCH_CATEGORIES_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: [...state.errors, action.payload],
      };
    default:
      return state;
  }
};
