import { all, fork } from "redux-saga/effects";
import youtubeSaga from "./youtube.saga";

export default function* rootSaga() {
	yield all([
    fork(youtubeSaga)
	]);
}
