/* eslint-disable no-constant-condition */
import { take, put, call, fork, all } from 'redux-saga/effects';
import * as api from './api';
import * as actions from './actions';

// each entity defines 3 creators { request, success, failure }
const { insights } = actions;

/***************************** Subroutines ************************************/

// load insights unless it is cached
function* loadInsights(mode, startDate, endDate) {
  yield put(insights.request());
  const {response, error} = yield call(api.fetchInsights, mode, startDate, endDate);
  if (response)
    yield put(insights.success(response));
  else
    yield put(insights.failure(error));
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// Fetches data for current logged in User
function* watchLoadInsights() {
  while(true) {
    const {mode, startDate, endDate} = yield take(actions.LOAD_INSIGHTS);
    yield fork(loadInsights, mode, startDate, endDate);
  }
}

export default function* insightsSagas() {
  yield all([
    fork(watchLoadInsights)
  ]);
}
