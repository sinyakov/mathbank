import {
  FETCH_CATEGORY_PROBLEMS_START,
  FETCH_CATEGORY_PROBLEMS_FAILURE,
  FETCH_CATEGORY_PROBLEMS_SUCCESS,
} from '../actions/constants';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_PROBLEMS_START:
      return {
        ...state,
        [action.payload]: {
          isLoading: true,
        },
      };
    case FETCH_CATEGORY_PROBLEMS_SUCCESS:
      return {
        ...state,
        [action.payload.category]: {
          isLoading: false,
          list: action.payload.list,
        },
      };
    case FETCH_CATEGORY_PROBLEMS_FAILURE:
      return {
        ...state,
        [action.payload.category]: {
          isLoading: false,
          errors: action.payload,
        },
      };
    default:
      return state;
  }
};
