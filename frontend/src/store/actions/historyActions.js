// Action Types
export const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
export const UNDO = 'UNDO';
export const REDO = 'REDO';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';

// Action Creators
export const addToHistory = (operation) => ({
  type: ADD_TO_HISTORY,
  payload: operation
});

export const undo = () => ({
  type: UNDO
});

export const redo = () => ({
  type: REDO
});

export const clearHistory = () => ({
  type: CLEAR_HISTORY
});
