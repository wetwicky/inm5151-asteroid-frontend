import {
    CONNECTED,
    DISCONNECTED,
    SET_NAME,
    WINDOW_RESIZE,
    UPDATE_ENTITIES,
    PLAYER_LEFT,
    GET_PLAYERS
} from '../constants'

const game = (state = {
    gameStarted: false,
    name: '',
    w: 0,
    h: 0,
    players: {}
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
        case UPDATE_ENTITIES:
        {
            let players = action.payload.players
            return {
                ...state,
                players: players
            }
        }
        case GET_PLAYERS:
        {
            return {
                ...state,
                players: action.payload
            }
        }
        case PLAYER_LEFT:
        {
            console.warn(state.players)
            let players = {
                ...state.players
            }
            delete players[action.payload]
            return {
                ...state,
                players: players
            }
        }
        default:
            return state
    }
}

export default game;
