import {
    CONNECT,
    CONNECTING,
    CONNECTED,
    DISCONNECT,
    DISCONNECTED,
    SET_NAME,
    SEND_HELLO,
    RECEIVE_HELLO,
    UPDATE_TOP_TEN
} from '../constants'

export const connect = () => {
    return {
        type: CONNECT
    }
}

export const connecting = () => {
    return {
        type: CONNECTING
    }
}

export const connected = () => {
    return {
        type: CONNECTED
    }
}

export const disconnect = () => {
    return {
        type: DISCONNECT
    }
}

export const disconnected = () => {
    return {
        type: DISCONNECTED
    }
}

export const setName = (name) => {
    return {
        type: SET_NAME,
        name: name
    }
}

export const sendHello = (from) => {
    return {
        type: SEND_HELLO,
        payload: {
            from: from
        }
    }
}

export const updateTopTen = (topTen) => {
    return {
        type: UPDATE_TOP_TEN,
        payload: topTen
    }
}
