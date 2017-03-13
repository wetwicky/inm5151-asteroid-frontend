import { UPDATE, UPDATE_OTHER_PLAYER, GET_PLAYERS, PLAYER_LEFT, FIRE } from '../constants';

export function update() {
    return {
        type: UPDATE
    }
}

export function updateOtherPlayer(payload) {
    return {
        type: UPDATE_OTHER_PLAYER,
        payload: payload
    }
}

export function getPlayers(payload) {
    return {
        type: GET_PLAYERS,
        payload: payload
    }
}

export function playerLeft(id) {
    return {
        type: PLAYER_LEFT,
        payload: id
    }
}

export function updateLeft(activated) {
    return {
        type: UPDATE,
        payload: {left: activated},
    }
}

export function updateRight(activated) {
    return {
        type: UPDATE,
        payload: {right: activated},
    }
}

export function updateUp(activated) {
    return {
        type: UPDATE,
        payload: {up: activated},
    }
}

export function fire(id) {
    return {
        type: FIRE,
        payload: id
    }
}
