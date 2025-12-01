import {
  SET_CURRENT_VIDEO,
  SET_LOADING,
  SET_ERROR,
  CLEAR_VIDEO
} from '../actions/videoActions';

const initialState = {
  currentVideo: null,
  loading: false,
  error: null
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_VIDEO:
      return {
        ...state,
        currentVideo: action.payload,
        error: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CLEAR_VIDEO:
      return initialState;
    default:
      return state;
  }
};

export default videoReducer;
