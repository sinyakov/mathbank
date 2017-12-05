import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import reducers from './reducers';

const emptyState = {
  solvedProblems: [],
  basket: {
    list: [],
  },
};

const defaultState = localStorage['mathbank-store']
  ? JSON.parse(localStorage['mathbank-store'])
  : emptyState;

const store = createStore(reducers, defaultState, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
  const { solvedProblems, basket } = store.getState();
  localStorage['mathbank-store'] = JSON.stringify({ solvedProblems, basket });
});

export default store;
