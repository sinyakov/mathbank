import {
  ADD_PROBLEM_TO_BASKET,
  REMOVE_PROBLEM_FROM_BASKET,
  REORDER_PROBLEMS_IN_BASKET,
} from '../actions/constants';

const defaultState = {
  name: 'Домашнее задание',
  list: [],
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
    default:
      return state;
  }
};
