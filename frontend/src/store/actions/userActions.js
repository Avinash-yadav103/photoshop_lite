// Action Types
export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token
});

export const logout = () => ({
  type: LOGOUT
});
