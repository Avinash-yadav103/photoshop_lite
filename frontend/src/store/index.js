import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
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

// Enable Redux DevTools Extension if available
const composeEnhancers = 
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Log store changes for debugging
store.subscribe(() => {
  const state = store.getState();
  console.log('Redux store updated - history:', state.history);
});

export default store;
