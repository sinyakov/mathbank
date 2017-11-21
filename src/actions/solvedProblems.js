import { ADD_PROBLEM_TO_SOLVED, REMOVE_PROBLEM_FROM_SOLVED } from '../actions/constants';

export const addProblemToSolved = problemId => ({
  type: ADD_PROBLEM_TO_SOLVED,
  payload: problemId,
});

export const removeProblemFromSolved = problemId => ({
  type: REMOVE_PROBLEM_FROM_SOLVED,
  payload: problemId,
});
