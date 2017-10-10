import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import App from '../routes/app';
import UserPage from '../routes/user/userpage';
import RepoPage from '../routes/repo/repopage';

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