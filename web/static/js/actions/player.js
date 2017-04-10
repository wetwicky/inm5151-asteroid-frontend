import { UPDATE, UPDATE_ENTITIES, GET_PLAYERS, PLAYER_LEFT, RECEIVE_PLAYER_ID, PLAYER_COLLIDED } from '../constants';

export function update() {
    return {
        type: UPDATE
    }
}

export function updateEntities(payload) {
    return {
        type: UPDATE_ENTITIES,
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
        payload: {left_pressed: activated},
    }
}

export function updateRight(activated) {
    return {
        type: UPDATE,
        payload: {right_pressed: activated},
    }
}

export function updateUp(activated) {
    return {
        type: UPDATE,
        payload: {up_pressed: activated},
    }
}

export function firePressed(activated) {
    return {
        type: UPDATE,
        payload: {fire_pressed: activated}
    }
}

export function receivePlayerId(playerId) {
    return {
        type: RECEIVE_PLAYER_ID,
        payload: playerId
    }
}

export function playerCollided(payload) {
  return {
        type: PLAYER_COLLIDED,
        payload: payload
  }
}
