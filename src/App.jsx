import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import store from './store';
import Catalog from './components/Catalog';
import Homework from './components/Homework';
import Basket from './components/Basket';
import AuthRoute from './containers/AuthRoute';
import DefaultRoute from './containers/DefaultRoute';

const Wrapper = styled.div`
  position: relative;
  margin: 24px auto;
  padding: 0 8px;
  max-width: 720px;
`;

const App = () => (
  <Provider store={store}>
    <Wrapper>
      <BrowserRouter>
        <Switch>
          <DefaultRoute exact path="/category/:category" component={Catalog} />
          <DefaultRoute exact path="/homework/:homework" component={Homework} />
          <AuthRoute exact path="/basket" component={Basket} />
          <Redirect from="/" to="/category/proportions" />
        </Switch>
      </BrowserRouter>
    </Wrapper>
  </Provider>
);

export default App;
