import * as fromActions from "../actions/youtube.actions";

const initialState = {
  videoInfo: null,
  error: null,
  loading: false
};

const youtubeReducer = (state = initialState, action) => {
	switch(action.type) {
		case fromActions.GET_VIDEO_INFO: {
			return {
				...state,
        loading: true,
        error: null
			};
    }
    case fromActions.GET_VIDEO_INFO_SUCCESS: {
      return {
        ...state,
        loading: false,
        videoInfo: action.videoInfo
      };
    }
    case fromActions.GET_VIDEO_INFO_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.message
      };
    }
		default: {
			return state;
		}
	}
};

export default youtubeReducer;
