import { call, put, takeLatest, all } from "redux-saga/effects";
import * as youtubeService from "../services/youtube.service";
import * as storageService from "../services/storage.service";
import * as youtubeActions from "../actions/youtube.actions";

function* getVideoInfo(action) {
	try {
		const videoInfo = yield call(youtubeService.getVideoInfo, action.videoId);
		yield put(youtubeActions.getVideoInfoSuccess(videoInfo));
	} catch (e) {
		yield put(youtubeActions.getVideoInfoFail(e.message));
	}
}

function* searchVideos(action) {
  try {
    const searchResults = yield call(youtubeService.searchVideos, action.query);
    yield put(youtubeActions.searchVideosSuccess(searchResults));
  } catch (e) {
    yield put(youtubeActions.searchVideosFail(e.message));
  }
}

function* getDownloadedVideo(action) {
  try {
    const video = yield call(storageService.getVideo, action.id);
    yield put(youtubeActions.searchVideosSuccess(video));
  } catch (e) {
    yield put(youtubeActions.searchVideosFail(e.message));
  }
}

function* downloadVideo(action) {
  try {
    yield call(youtubeService.downloadVideo, action.id);
    yield put(youtubeActions.searchVideosSuccess());
  } catch (e) {
    yield put(youtubeActions.searchVideosFail(e.message));
  }
}

function* youtubeSaga() {
	yield all([
    takeLatest(youtubeActions.GET_VIDEO_INFO, getVideoInfo),
    takeLatest(youtubeActions.SEARCH_VIDEOS, searchVideos),
    takeLatest(youtubeActions.GET_DOWNLOADED_VIDEO, getDownloadedVideo),
    takeLatest(youtubeActions.DOWNLOAD_VIDEO, downloadVideo)
	]);
}

export default youtubeSaga;
