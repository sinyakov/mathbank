import {
  REMOVE_PROBLEM_START,
  REMOVE_PROBLEM_SUCCESS,
  REMOVE_PROBLEM_FAILURE,
} from '../actions/constants';

const defaultState = {
  error: null,
  isHydrating: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case REMOVE_PROBLEM_START:
      return {
        ...state,
        isHydrating: true,
        error: null,
      };
    case REMOVE_PROBLEM_SUCCESS:
      return {
        ...state,
        isHydrating: false,
      };
    case REMOVE_PROBLEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        isHydrating: false,
      };
    default:
      return state;
  }
};
