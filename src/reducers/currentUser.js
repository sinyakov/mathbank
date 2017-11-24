import { AUTH_START, AUTH_FAILURE, AUTH_SUCCESS } from '../actions/constants';

const defaultState = {
  user: null,
  isLoading: false,
  isLogged: false,
  error: null,
  isFirstAttempt: true,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        isLogged: false,
        user: null,
        isFirstAttempt: false,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        isLogged: true,
        user: action.payload,
      };

    case AUTH_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLogged: false,
        isLoading: false,
        user: null,
      };

    default:
      return state;
  }
};
