export const GET_VIDEO_INFO = "[Youtube] Get Video Info";
export const GET_VIDEO_INFO_SUCCESS = "[Youtube] Get Video Info Success";
export const GET_VIDEO_INFO_FAIL = "[Youtube] Get Video Info Fail";
export const CLEAR_VIDEO_INFO = "[Youtube] Clear Video Info";

export function getVideoInfo(videoId) {
	return { type: GET_VIDEO_INFO, videoId };
}
export function getVideoInfoSuccess(videoInfo) {
	return { type: GET_VIDEO_INFO_SUCCESS, videoInfo };
}
export function getVideoInfoFail(message) {
	return { type: GET_VIDEO_INFO_FAIL, message };
}
export function clearVideoInfo() {
  return { type: CLEAR_VIDEO_INFO };
}

export const SEARCH_VIDEOS = "[Youtube] Search Videos";
export const SEARCH_VIDEOS_SUCCESS = "[Youtube] Search Videos Success";
export const SEARCH_VIDEOS_FAIL = "[Youtube] Search Videos Fail";
export const CLEAR_SEARCH_RESULTS = "[Youtube] Clear Search Results";

export function searchVideos(query) {
  return { type: SEARCH_VIDEOS, query };
}
export function searchVideosSuccess(searchResults) {
  return { type: SEARCH_VIDEOS_SUCCESS, searchResults };
}
export function searchVideosFail(message) {
  return { type: SEARCH_VIDEOS_FAIL, message };
}
export function clearSearchResults() {
  return { type: CLEAR_SEARCH_RESULTS };
}

export const DOWNLOAD_VIDEO = "[Youtube] Download Video";
export const DOWNLOAD_VIDEO_SUCCESS = "[Youtube] Download Video Success";
export const DOWNLOAD_VIDEO_FAIL = "[Youtube] Download Video Fail";

export function downloadVideo(videoId, quality, videoInfo) {
  return { type: DOWNLOAD_VIDEO, videoId, quality, videoInfo };
}
export function downloadVideoSuccess() {
  return { type: DOWNLOAD_VIDEO_SUCCESS };
}
export function downloadVideoFail(message) {
  return { type: DOWNLOAD_VIDEO_FAIL, message };
}

export const GET_DOWNLOADED_VIDEO = "[Youtube] Get Downloaded Video";
export const GET_DOWNLOADED_VIDEO_SUCCESS = "[Youtube] Get Downloaded Video Success";
export const GET_DOWNLOADED_VIDEO_FAIL = "[Youtube] Get Downloaded Video Fail";

export function getDownloadedVideo(videoId) {
  return { type: GET_DOWNLOADED_VIDEO, videoId };
}
export function getDownloadedVideoSuccess(video) {
  return { type: GET_DOWNLOADED_VIDEO_SUCCESS, video };
}
export function getDownloadedVideoFail(message) {
  return { type: GET_DOWNLOADED_VIDEO_FAIL, message };
}
