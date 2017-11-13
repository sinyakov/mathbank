import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import store from './store';
import Catalog from './components/Catalog';
import Homework from './components/Homework';

const App = () => (
  <Provider store={store}>
    <div className="wrap">
      <BrowserRouter>
        <Switch>
          <Route exact path="/category/:category" component={Catalog} />
          <Route exact path="/homework/:homework" component={Homework} />
          <Redirect from="/" to="/category/proportions" />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>
);

export default App;
