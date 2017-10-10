/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, all } from 'redux-saga/effects';
import * as api from './api';
import * as actions from './actions';
import { getRepo, getStargazersByRepo } from './selectors';

// each entity defines 3 creators { request, success, failure }
const { repo, stargazers } = actions;

// url for first page
// urls for next routes will be extracted from the successive loadMore* requests
const firstPageStargazersUrl = fullName => `repos/${fullName}/stargazers`;


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
export const fetchRepo       = fetchEntity.bind(null, repo, api.fetchRepo);
export const fetchStargazers = fetchEntity.bind(null, stargazers, api.fetchStargazers);

// load repo unless it is cached
function* loadRepo(fullName, requiredFields) {
  const repo = yield select(getRepo, fullName);
  if (!repo || requiredFields.some(key => !repo.hasOwnProperty(key)))
    yield call(fetchRepo, fullName);
}

// load next page of users who starred this repo unless it is cached
function* loadStargazers(fullName, loadMore) {
  const stargazersByRepo = yield select(getStargazersByRepo, fullName);
  if (!stargazersByRepo || !stargazersByRepo.pageCount || loadMore)
    yield call(
        fetchStargazers,
        fullName,
        stargazersByRepo.nextPageUrl || firstPageStargazersUrl(fullName)
    );
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// Fetches data for a Repo: repo data + repo stargazers
function* watchLoadRepoPage() {
  while(true) {
    const {fullName, requiredFields = []} = yield take(actions.LOAD_REPO_PAGE);

    yield fork(loadRepo, fullName, requiredFields);
    yield fork(loadStargazers, fullName);
  }
}

function* watchLoadMoreStargazers() {
  while(true) {
    const {fullName} = yield take(actions.LOAD_MORE_STARGAZERS);
    yield fork(loadStargazers, fullName, true);
  }
}

export default function* repoSagas() {
  yield all([
    fork(watchLoadRepoPage),
    fork(watchLoadMoreStargazers)
  ]);
}
