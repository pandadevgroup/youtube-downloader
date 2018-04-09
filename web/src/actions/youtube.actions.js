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
