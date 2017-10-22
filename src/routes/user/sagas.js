/* eslint-disable no-constant-condition */
import { take, put, call, fork, all } from 'redux-saga/effects';
import * as api from './api';
import * as actions from './actions';

// each entity defines 3 creators { request, success, failure }
const { user } = actions;

/***************************** Subroutines ************************************/

// logout
function* logout() {
  const {response, error} = yield call(api.logout);
  window.location = `/`;
}

// load user unless it is cached
function* loadCurrentUser() {
  yield put(user.request());
  const {response, error} = yield call(api.fetchUser);
  if (response)
    yield put(user.success(response));
  else
    yield put(user.failure(error));
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// Fetches data for current logged in User
function* watchLoadCurrentUser() {
  while(true) {
    yield take(actions.LOAD_CURRENT_USER);
    yield fork(loadCurrentUser);
  }
}

// Logout
function* watchLogout() {
  while(true) {
    yield take(actions.LOGOUT);
    yield fork(logout);
  }
}

export default function* userSagas() {
  yield all([
    fork(watchLoadCurrentUser),
    fork(watchLogout)
  ]);
}
