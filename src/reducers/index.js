import { combineReducers } from 'redux';
import categories from './categories';
import problems from './problems';
import homeworks from './homeworks';
import basket from './basket';
import solvedProblems from './solvedProblems';

export default combineReducers({
  categories,
  homeworks,
  problems,
  solvedProblems,
  basket,
});