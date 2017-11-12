import {
  FETCH_CATEGORY_PROBLEMS_START,
  FETCH_CATEGORY_PROBLEMS_FAILURE,
  FETCH_CATEGORY_PROBLEMS_SUCCESS,
} from '../actions/constants';

const defaultState = {
  isLoading: false,
  dict: {},
  errors: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_PROBLEMS_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CATEGORY_PROBLEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: { ...state.list, [action.payload.category]: action.payload.list },
      };
    case FETCH_CATEGORY_PROBLEMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: [...state.errors, action.payload],
      };
    default:
      return state;
  }
};
