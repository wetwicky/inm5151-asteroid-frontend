import {
    CONNECTED,
    DISCONNECTED,
    SET_NAME,
    WINDOW_RESIZE,
    RECEIVE_HELLO
} from '../constants'

const game = (state = {
    gameStarted: false,
    name: '',
    w: 0,
    h: 0,
    hellos: []
}, action) => {
    switch (action.type) {
        case CONNECTED:
            return {
                ...state,
                gameStarted: true,
            }
        case DISCONNECTED:
            return {
                ...state,
                gameStarted: false
            }
        case SET_NAME:
            return {
                ...state,
                name: action.name
            }
        case WINDOW_RESIZE:
            return {
                ...state,
                ...action.payload
            }
        case RECEIVE_HELLO:
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
