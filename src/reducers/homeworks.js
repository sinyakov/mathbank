import {
  FETCH_HOMEWORK_START,
  FETCH_HOMEWORK_SUCCESS,
  FETCH_HOMEWORK_FAILURE,
} from '../actions/constants';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_HOMEWORK_START:
      return {
        ...state,
        [action.payload]: {
          isLoading: true,
        },
      };
    case FETCH_HOMEWORK_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          isLoading: false,
          date: action.payload.date,
          list: action.payload.list,
        },
      };
    case FETCH_HOMEWORK_FAILURE:
      return {
        ...state,
        [action.payload.id]: {
          isLoading: false,
          error: action.payload.error,
        },
      };
    default:
      return state;
  }
};
