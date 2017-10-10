/* eslint-disable no-constant-condition */
import { fork, all } from 'redux-saga/effects';
import repoSagas from '../pages/repo/sagas';
import userSagas from "../pages/user/sagas";

export default function* root() {
  yield all([
    fork(repoSagas),
    fork(userSagas)
  ]);
}
