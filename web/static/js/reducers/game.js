import {
    CONNECTED,
    DISCONNECTED,
    SET_NAME,
    WINDOW_RESIZE,
    UPDATE_OTHER_PLAYER
} from '../constants'

const game = (state = {
    gameStarted: false,
    name: '',
    w: 0,
    h: 0,
    players: []
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
        case UPDATE_OTHER_PLAYER:
            let players = {
                ...state.players,
                [action.payload.id]: action.payload
            }
            let newState = {
                ...state,
                players: players
            }
            return newState
        default:
            return state
    }
}

export default game;
