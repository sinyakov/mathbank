import {
  ADD_PROBLEM_TO_BASKET,
  REMOVE_PROBLEM_FROM_BASKET,
  REORDER_PROBLEMS_IN_BASKET,
} from '../actions/constants';

export const reorderProblems = orderedList => ({
  type: REORDER_PROBLEMS_IN_BASKET,
  payload: orderedList,
});

export const addProblemToBasket = problem => ({
  type: ADD_PROBLEM_TO_BASKET,
  payload: problem,
});

export const removeProblemFromBasket = problem => ({
  type: REMOVE_PROBLEM_FROM_BASKET,
  payload: problem,
});
