import { ADD_PROBLEM_TO_SOLVED } from '../actions/constants';

const defaultState = {
  problems: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_PROBLEM_TO_SOLVED:
      return {
        ...state,
        problems: [...state.problems, action.payload],
      };
    default:
      return state;
  }
};
