import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import imageReducer from './reducers/imageReducer';
import videoReducer from './reducers/videoReducer';
import userReducer from './reducers/userReducer';
import historyReducer from './reducers/historyReducer';

const rootReducer = combineReducers({
  image: imageReducer,
  video: videoReducer,
  user: userReducer,
  history: historyReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
