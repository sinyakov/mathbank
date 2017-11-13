import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Catalog from './components/Catalog';

const App = () => (
  <Provider store={store}>
    <div className="wrap">
      <Catalog categoryHash="last-digit" />
    </div>
  </Provider>
);

export default App;
