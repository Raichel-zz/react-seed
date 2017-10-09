import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import rootSaga from './sagas';

const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
);
