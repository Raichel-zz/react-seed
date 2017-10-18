/* eslint-disable no-constant-condition */
import { fork, all } from 'redux-saga/effects';
import userSagas from "./routes/user/sagas";

export default function* root() {
  yield all([
    fork(userSagas)
  ]);
}
