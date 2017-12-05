import {
  POST_NEW_PROBLEM_START,
  POST_NEW_PROBLEM_SUCCESS,
  POST_NEW_PROBLEM_FAILURE,
} from '../actions/constants';

const defaultState = {
  error: null,
  isHydrating: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case POST_NEW_PROBLEM_START:
      return {
        ...state,
        isHydrating: true,
        error: null,
      };
    case POST_NEW_PROBLEM_SUCCESS:
      return {
        ...defaultState,
      };
    case POST_NEW_PROBLEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        isHydrating: false,
      };
    default:
      return state;
  }
};
