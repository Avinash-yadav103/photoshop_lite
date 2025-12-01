// Action Types
export const SET_CURRENT_IMAGE = 'SET_CURRENT_IMAGE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_IMAGE = 'CLEAR_IMAGE';

// Action Creators
export const setCurrentImage = (image) => ({
  type: SET_CURRENT_IMAGE,
  payload: image
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

export const clearImage = () => ({
  type: CLEAR_IMAGE
});
