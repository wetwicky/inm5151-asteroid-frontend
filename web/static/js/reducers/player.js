import { UPDATE, BASE_SPEED, BASE_ROTATION_SPEED, RECEIVE_PLAYER_ID } from '../constants'

const player = (state = {
    left: false,
    right: false,
    up: false,
    lastUpdate: null,
    id: null
}, action) => {
    switch (action.type) {
        case UPDATE:
            let newState = {
                ...state,
                ...action.payload
            }

            return newState
        
        case RECEIVE_PLAYER_ID:
            return {
                ...state,
                id: action.payload
            }
        default:
            return state
    }
}

export default player;
