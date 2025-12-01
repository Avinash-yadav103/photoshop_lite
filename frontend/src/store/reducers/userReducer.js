import {
  SET_USER,
  SET_TOKEN,
  LOGOUT
} from '../actions/userActions';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token')
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case SET_TOKEN:
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      }
      return {
        ...state,
        token: action.payload,
        isAuthenticated: !!action.payload
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        user: null,
        token: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default userReducer;
