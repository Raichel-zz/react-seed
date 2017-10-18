import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import DevTools from './devtools';
import { Route } from 'react-router-dom';
import App from '../routes/app';
import RepoPage from '../routes/repo';
import UserPage from '../routes/user';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Route path="/" component={App} />
      {/*<Route path="/:login/:name" component={RepoPage} />*/}
      {/*<Route path="/:login" component={UserPage} />*/}
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
