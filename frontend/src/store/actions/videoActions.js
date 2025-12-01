// Action Types
export const SET_CURRENT_VIDEO = 'SET_CURRENT_VIDEO';
export const SET_LOADING = 'SET_VIDEO_LOADING';
export const SET_ERROR = 'SET_VIDEO_ERROR';
export const CLEAR_VIDEO = 'CLEAR_VIDEO';

// Action Creators
export const setCurrentVideo = (video) => ({
  type: SET_CURRENT_VIDEO,
  payload: video
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

export const clearVideo = () => ({
  type: CLEAR_VIDEO
});
