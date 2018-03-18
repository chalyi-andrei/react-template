// @flow
import { takeEvery, put } from "redux-saga/effects";
import api from "../../api";
import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILED } from "../modules/auth/auth";

export const AUTH_TOKEN = "test/authToken";

function* signUp({ data }) {
  try {
    //const result = yield api().auth.signUp();
    // const authToken = headers["auth-token"];
    // localStorage.setItem(AUTH_TOKEN, authToken);
  } catch (err) {
    yield put({ type: SIGN_UP_FAILED, err });
  }
}

export default function* rootSaga(): Generator<*, *, *> {
  yield takeEvery(SIGN_UP, signUp);
}
