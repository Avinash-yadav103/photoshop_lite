import {
  SET_CURRENT_IMAGE,
  SET_LOADING,
  SET_ERROR,
  CLEAR_IMAGE,
  SET_EDITOR_STATE
} from '../actions/imageActions';

const initialState = {
  currentImage: null,
  loading: false,
  error: null,
  // Editor state persistence
  editorState: {
    previewUrl: null,
    imageId: null,
    selectedFile: null,
    imageDimensions: { width: 0, height: 0 },
    zoom: 100
  }
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_IMAGE:
      return {
        ...state,
        currentImage: action.payload,
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
    case SET_EDITOR_STATE:
      return {
        ...state,
        editorState: {
          ...state.editorState,
          ...action.payload
        }
      };
    case CLEAR_IMAGE:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default imageReducer;
