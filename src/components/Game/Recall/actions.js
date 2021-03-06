// --- Action types

import { setGameState } from '../actions';
import { gameState } from '../reducers';

export const actionTypes = {
  RECALL_NEXT: 'RECALL_NEXT',
  CHANGED_INPUT_TEXT: 'CHANGED_INPUT_TEXT',
};

// --- Action creators

export function next() {
  return (dispatch, getState) => {
    const { game: { imageOrder }, recall: { currIndex } } = getState();
    const numItems = imageOrder.length;
    const nextIndex = currIndex + 1;

    if (nextIndex >= numItems) {
      dispatch(setGameState(gameState.RESULTS));
    }

    dispatch({ type: actionTypes.RECALL_NEXT });
  };
}

export function changedInputText(text) {
  return { type: actionTypes.CHANGED_INPUT_TEXT, payload: { text } };
}
