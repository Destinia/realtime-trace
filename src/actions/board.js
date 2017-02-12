export const UPDATE_BOARD = 'UPDATE_BOARD';

export const updateBoard = (boardName) => ({
  type: UPDATE_BOARD,
  payload: boardName,
});
