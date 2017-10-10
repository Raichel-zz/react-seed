/* eslint-disable no-constant-condition */
import { fork, all } from 'redux-saga/effects';
import repoSagas from '../routes/repo/sagas';
import userSagas from "../routes/user/sagas";

export default function* root() {
  yield all([
    fork(repoSagas),
    fork(userSagas)
  ]);
}
