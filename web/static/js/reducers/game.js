const game = (state = {
    gameStarted: false,
    name: '',
    hellos: []
}, action) => {
    switch (action.type) {
        case 'CONNECTED':
            return {
                ...state,
                gameStarted: true,
            }
        case 'DISCONNECTED':
            return {
                ...state,
                gameStarted: false
            }
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'RECEIVE_HELLO':
            return {
                ...state,
                hellos: [
                    ...state.hellos,
                    action.payload
                ]
            }
        default:
            return state
    }
}

export default game;
