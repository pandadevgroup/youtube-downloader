import * as fromActions from "../actions/youtube.actions";

const initialState = {
  videoId: null,
  videoInfo: null,
  error: null,
  loading: false,
  searchResults: null
};

const youtubeReducer = (state = initialState, action) => {
	switch(action.type) {
		case fromActions.GET_VIDEO_INFO: {
			return {
				...state,
        loading: true,
        videoId: action.videoId,
        videoInfo: null,
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
    case fromActions.CLEAR_VIDEO_INFO: {
      return {
        ...state,
        videoId: null,
        videoInfo: null
      };
    }
    case fromActions.SEARCH_VIDEOS: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case fromActions.SEARCH_VIDEOS_SUCCESS: {
      return {
        ...state,
        loading: false,
        searchResults: action.searchResults,
        error: null
      };
    }
    case fromActions.SEARCH_VIDEOS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.message
      };
    }
    case fromActions.CLEAR_SEARCH_RESULTS: {
      return {
        ...state,
        searchResults: null
      };
    }
		default: {
			return state;
		}
	}
};

export default youtubeReducer;
