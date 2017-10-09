import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import App from './App';
import UserPage from '../pages/user/UserPage';
import RepoPage from '../pages/repo/RepoPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <Route path="/" component={App} />
    <Route path="/:login/:name"
           component={RepoPage} />
    <Route path="/:login"
           component={UserPage} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};
export default Root;
