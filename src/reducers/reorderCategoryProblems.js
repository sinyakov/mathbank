import {
  REODRED_CATEGORY_PROBLEMS_START,
  REODRED_CATEGORY_PROBLEMS_FAILURE,
  REODRED_CATEGORY_PROBLEMS_SUCCESS,
} from '../actions/constants';

const defaultState = {
  error: null,
  isHydrating: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case REODRED_CATEGORY_PROBLEMS_START:
      return {
        ...state,
        id: action.categoryId,
        list: action.problemsList,
        isHydrating: true,
        error: null,
      };
    case REODRED_CATEGORY_PROBLEMS_FAILURE:
      return {
        ...state,
        isHydrating: false,
      };
    case REODRED_CATEGORY_PROBLEMS_SUCCESS:
      return {
        ...state,
        error: action.payload,
        isHydrating: false,
      };
    default:
      return state;
  }
};
