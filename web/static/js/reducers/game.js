import {
    CONNECTED,
    DISCONNECTED,
    SET_NAME,
    WINDOW_RESIZE,
    UPDATE_ENTITIES,
    PLAYER_LEFT,
    GET_PLAYERS,
    PLAYER,
    ASTEROID
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
            let players = {}
            let asteroids = {}
            Object.keys(action.payload).forEach(key => {
                let obj = action.payload[key]
                switch (obj.type) {
                case PLAYER:
                    players[key] = obj
                    break
                case ASTEROID:
                    asteroids[key] = obj
                    break
                default:
                    console.log(key)
                    console.log(object)
                }
            });
            return {
                ...state,
                players: players,
                asteroids: asteroids
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
