import { UPDATE } from '../constants';

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
