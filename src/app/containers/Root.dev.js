import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import { Route } from 'react-router-dom';
import App from './App';
import RepoPage from '../pages/repo';
import UserPage from '../pages/user';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Route path="/" component={App} />
      <Route path="/:login/:name" component={RepoPage} />
      <Route path="/:login" component={UserPage} />
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
