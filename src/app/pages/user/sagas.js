/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, all } from 'redux-saga/effects';
import * as api from './api';
import * as actions from './actions';
import { getUser, getStarredByUser } from './selectors';

// each entity defines 3 creators { request, success, failure }
const { user, starred } = actions;

// url for first page
// urls for next pages will be extracted from the successive loadMore* requests
const firstPageStarredUrl = login => `users/${login}/starred`;

/***************************** Subroutines ************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass id to apiFn
function* fetchEntity(entity, apiFn, id, url) {
  yield put( entity.request(id) );
  const {response, error} = yield call(apiFn, url || id);
  if(response)
    yield put( entity.success(id, response) );
  else
    yield put( entity.failure(id, error) );
}

// yeah! we can also bind Generators
export const fetchUser       = fetchEntity.bind(null, user, api.fetchUser);
export const fetchStarred    = fetchEntity.bind(null, starred, api.fetchStarred);

// load user unless it is cached
function* loadUser(login, requiredFields) {
  const user = yield select(getUser, login);
  if (!user || requiredFields.some(key => !user.hasOwnProperty(key))) {
    yield call(fetchUser, login);
  }
}

// load next page of repos starred by this user unless it is cached
function* loadStarred(login, loadMore) {
  const starredByUser = yield select(getStarredByUser, login);
  if (!starredByUser || !starredByUser.pageCount || loadMore)
    yield call(
        fetchStarred,
        login,
        starredByUser.nextPageUrl || firstPageStarredUrl(login)
    );
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// Fetches data for a User : user data + starred repos
function* watchLoadUserPage() {
  while(true) {
    const {login, requiredFields = []} = yield take(actions.LOAD_USER_PAGE);

    yield fork(loadUser, login, requiredFields);
    yield fork(loadStarred, login);
  }
}

// Fetches more starred repos, use pagination data from getStarredByUser(login)
function* watchLoadMoreStarred() {
  while(true) {
    const {login} = yield take(actions.LOAD_MORE_STARRED);
    yield fork(loadStarred, login, true);
  }
}

export default function* userSagas() {
  yield all([
    fork(watchLoadUserPage),
    fork(watchLoadMoreStarred)
  ]);
}
