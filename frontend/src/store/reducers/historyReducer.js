import {
  ADD_TO_HISTORY,
  UNDO,
  REDO,
  CLEAR_HISTORY
} from '../actions/historyActions';

const initialState = {
  past: [],
  present: null,
  future: []
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_HISTORY:
      return {
        past: state.present ? [...state.past, state.present] : state.past,
        present: action.payload,
        future: []
      };
    case UNDO:
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: state.present ? [state.present, ...state.future] : state.future
      };
    case REDO:
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        past: state.present ? [...state.past, state.present] : state.past,
        present: next,
        future: newFuture
      };
    case CLEAR_HISTORY:
      return initialState;
    default:
      return state;
  }
};

export default historyReducer;
