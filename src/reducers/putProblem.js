import {
  UPDATE_PROBLEM_START,
  UPDATE_PROBLEM_SUCCESS,
  UPDATE_PROBLEM_FAILURE,
} from '../actions/constants';

const defaultState = {
  error: null,
  isHydrating: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_PROBLEM_START:
      return {
        ...state,
        isHydrating: true,
        error: null,
      };
    case UPDATE_PROBLEM_SUCCESS:
      return {
        ...state,
        isHydrating: false,
      };
    case UPDATE_PROBLEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        isHydrating: false,
      };
    default:
      return state;
  }
};
