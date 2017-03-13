import { UPDATE, UPDATE_OTHER_PLAYER } from '../constants';

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
