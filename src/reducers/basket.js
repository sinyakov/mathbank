import {
  ADD_PROBLEM_TO_BASKET,
  REMOVE_PROBLEM_FROM_BASKET,
  REORDER_PROBLEMS_IN_BASKET,
  CLEAR_BASKET,
  CREATE_HOMEWORK_START,
  CREATE_HOMEWORK_SUCCESS,
  CREATE_HOMEWORK_FAILURE,
} from '../actions/constants';

const defaultState = {
  list: [],
  isHydrating: false,
  error: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_PROBLEM_TO_BASKET:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case REMOVE_PROBLEM_FROM_BASKET:
      return {
        ...state,
        list: state.list.filter(({ id }) => id !== action.payload),
      };
    case REORDER_PROBLEMS_IN_BASKET:
      return {
        ...state,
        list: action.payload,
      };
    case CLEAR_BASKET:
      return {
        ...state,
        list: [],
      };
    case CREATE_HOMEWORK_START:
      return {
        ...state,
        isHydrating: true,
      };
    case CREATE_HOMEWORK_SUCCESS:
      return {
        ...state,
        isHydrating: false,
        error: null,
      };
    case CREATE_HOMEWORK_FAILURE:
      return {
        ...state,
        isHydrating: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
