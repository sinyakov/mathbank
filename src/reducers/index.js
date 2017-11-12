import { combineReducers } from 'redux';
import categories from './categories';
import problems from './problems';
import solved from './solved';

export default combineReducers({
  categories,
  problems,
  solved,
});
