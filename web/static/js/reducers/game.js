const game = (state = {}, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
        name: action.name
      };
    case 'END_GAME':
      return {
        ...state,
        gameStarted: false
      };
    default:
      return state
  }
}

export default game;
