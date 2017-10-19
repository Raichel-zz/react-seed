/* eslint-disable no-constant-condition */
import { fork, all } from 'redux-saga/effects';
import userSagas from './routes/user/sagas';
import insightsSagas from './routes/insights/sagas';

export default function* root() {
  yield all([
    fork(userSagas),
    fork(insightsSagas)
  ]);
}
