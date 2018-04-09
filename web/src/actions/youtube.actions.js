export const GET_VIDEO_INFO = "[Youtube] Get Video Info";
export const GET_VIDEO_INFO_SUCCESS = "[Youtube] Get Video Info Success";
export const GET_VIDEO_INFO_FAIL = "[Youtube] Get Video Info Fail";

export function getVideoInfo(videoId) {
	return { type: GET_VIDEO_INFO, videoId };
}
export function getVideoInfoSuccess(videoInfo) {
	return { type: GET_VIDEO_INFO_SUCCESS, videoInfo };
}
export function getVideoInfoFail(message) {
	return { type: GET_VIDEO_INFO_FAIL, message };
}
