import {
  ADD_TO_HISTORY,
  UNDO,
  REDO,
  CLEAR_HISTORY,
  GO_TO_HISTORY
} from '../actions/historyActions';

const initialState = {
  history: [],      // Array of all history items with image snapshots
  currentIndex: -1  // Current position in history (-1 means no history)
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_HISTORY:
      // Remove any future history when adding new item
      const newHistory = state.history.slice(0, state.currentIndex + 1);
      return {
        history: [...newHistory, action.payload],
        currentIndex: newHistory.length
      };
    case UNDO:
      if (state.currentIndex <= 0) return state;
      return {
        ...state,
        currentIndex: state.currentIndex - 1
      };
    case REDO:
      if (state.currentIndex >= state.history.length - 1) return state;
      return {
        ...state,
        currentIndex: state.currentIndex + 1
      };
    case GO_TO_HISTORY:
      if (action.payload < 0 || action.payload >= state.history.length) return state;
      return {
        ...state,
        currentIndex: action.payload
      };
    case CLEAR_HISTORY:
      return initialState;
    default:
      return state;
  }
};

export default historyReducer;
