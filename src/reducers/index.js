import { combineReducers } from 'redux';
import categories from './categories';
import problems from './problems';
import homeworks from './homeworks';
import basket from './basket';
import solvedProblems from './solvedProblems';
import currentUser from './currentUser';
import postProblem from './postProblem';
import putProblem from './putProblem';
import deleteProblem from './deleteProblem';

export default combineReducers({
  categories,
  homeworks,
  problems,
  solvedProblems,
  basket,
  currentUser,
  postProblem,
  putProblem,
  deleteProblem,
});
