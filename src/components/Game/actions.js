// --- Action types

export const actionTypes = {
  TOGGLE_GAME_STATE: 'TOGGLE_GAME_STATE',
  RESTART: 'RESTART',

  SET_NUM_CELEBS: 'SET_NUM_CELEBS',
  SET_ONLY_FIRST_NAMES: 'SET_ONLY_FIRST_NAMES',
  SET_POPULARITY: 'SET_POPULARITY',
};

// --- Action creators

export function setGameState(state) {
  return { type: actionTypes.TOGGLE_GAME_STATE, payload: { state } };
}

export function restart() {
  return { type: actionTypes.RESTART };
}

// --- Settings

export function setNumCelebs(numCelebs) {
  return { type: actionTypes.SET_NUM_CELEBS, payload: { numCelebs } };
}

export function setOnlyFirstNames(isChecked) {
  return { type: actionTypes.SET_ONLY_FIRST_NAMES, payload: { isChecked } };
}

export function setPopularity(isChecked, groupIndex) {
  return { type: actionTypes.SET_POPULARITY, payload: { isChecked, groupIndex } };
}
