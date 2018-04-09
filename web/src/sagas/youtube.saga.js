import { call, put, takeLatest, all } from "redux-saga/effects";
import * as YoutubeService from "../services/youtube.service";
import * as youtubeActions from "../actions/youtube.actions";

function* getVideoInfo(action) {
	try {
		const videoInfo = yield call(YoutubeService.getVideoInfo, action.videoId);
		yield put(youtubeActions.getVideoInfoSuccess(videoInfo));
	} catch (e) {
		yield put(youtubeActions.getVideoInfoFail(e.message));
	}
}

function* youtubeSaga() {
	yield all([
		takeLatest(youtubeActions.GET_VIDEO_INFO, getVideoInfo)
	]);
}

export default youtubeSaga;