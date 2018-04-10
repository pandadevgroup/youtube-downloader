export const STORE_VIDEO = "[Storage] Store Video";
export const STORE_VIDEO_SUCCESS = "[Storage] Store Video Success";
export const STORE_VIDEO_FAIL = "[Storage] Store Video Fail";

export function storeVideo(id, info, blob) {
  return { type: STORE_VIDEO, id, info, blob };
}
export function storeVideoSuccess(id) {
  return { type: STORE_VIDEO_SUCCESS, id };
}
export function storeVideoFail(message) {
  return { type: STORE_VIDEO_FAIL, message };
}

export const GET_VIDEO = "[Storage] Get Video";
export const GET_VIDEO_SUCCESS = "[Storage] Get Video Success";
export const GET_VIDEO_FAIL = "[Storage] Get Video Fail";

export function getVideo(id) {
  return { type: GET_VIDEO, id };
}
export function getVideoSuccess(video) {
  return { type: GET_VIDEO_SUCCESS, video };
}
export function getVideoFail(message) {
  return { type: GET_VIDEO_FAIL, message };
}
