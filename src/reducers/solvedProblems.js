import { ADD_PROBLEM_TO_SOLVED } from '../actions/constants';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_PROBLEM_TO_SOLVED:
      return [...state, action.payload];
    default:
      return state;
  }
};
