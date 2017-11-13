import { combineReducers } from 'redux';
import categories from './categories';
import problems from './problems';
import solvedProblems from './solvedProblems';

export default combineReducers({
  categories,
  problems,
  solvedProblems,
});
