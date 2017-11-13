import { ADD_PROBLEM_TO_SOLVED } from '../actions/constants';

export default problemId => ({
  type: ADD_PROBLEM_TO_SOLVED,
  payload: problemId,
});
