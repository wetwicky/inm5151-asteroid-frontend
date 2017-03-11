export const connect = () => {
    return {
        type: 'CONNECT'
    }
}

export const connecting = () => {
    return {
        type: 'CONNECTING'
    }
}

export const connected = () => {
    return {
        type: 'CONNECTED'
    }
}

export const disconnect = () => {
    return {
        type: 'DISCONNECT'
    }
}

export const disconnected = () => {
    return {
        type: 'DISCONNECTED'
    }
}

export const setName = (name) => {
    return {
        type: 'SET_NAME',
        name: name
    }
}

export const sendHello = (from) => {
    return {
        type: 'SEND_HELLO',
        payload: {
            from: from
        }
    }
}

export const receiveHello = (payload) => {
    return {
        ...payload,
        type: 'RECEIVE_HELLO'
    }
}
