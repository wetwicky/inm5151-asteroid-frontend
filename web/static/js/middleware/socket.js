"use strict";

import {Socket} from 'phoenix'
import { connecting, connected, disconnect, disconnected, receiveHello } from '../actions'
import { CONNECT, DISCONNECT, SEND_HELLO, RECEIVE_HELLO} from "../constants/index";

const socketMiddleware = (function () {
    var socket = null
    var channel = null

    const onOpen = (ws, store, username) => event => {
        // TODO Connect with server
        channel = socket.channel("player:default", {});
        channel.join()
            .receive('ok', resp => {
                console.log(resp)
                // Tell the store we are connected
                store.dispatch(connected())
            })
            .receive('error', resp => {
                console.error("Unable to join", resp)
                store.dispatch(disconnect())
            })
    }

    const onError = (ws, store) => event => {
        console.error(event)
    }

    const onClose = (ws, store) => event => {
        // Tell the store we are disconnected
        store.dispatch(disconnected())
    }

    const onMessage = (ws, store) => event => {
        // Parse the JSON message received on the websocket
        var msg = event.payload
        switch (msg.type) {
            case RECEIVE_HELLO:
                store.dispatch(receiveHello(msg))
                break
            case undefined:
                break
            default:
                console.log('Received unknown message type: "' + msg.type + '+')
                break
        }
    }

    return store => next => action => {
        switch (action.type) {
            // The user wants to connect
            case CONNECT:
            {
                // Start a new connection to the server
                if (channel != null) {
                    channel.leave()
                }
                if (socket != null) {
                    socket.disconnect();
                }

                // Send the store that we are connecting
                store.dispatch(connecting())

                let username = store.getState().game.name
                // Attempt to connect
                socket = new Socket("/socket", {params: {name: username}})
                socket.connect()
                socket.onOpen(onOpen(socket, store, username))
                socket.onError(onError(socket, store))
                socket.onClose(onClose(socket, store))
                socket.onMessage(onMessage(socket, store))

                break;
            }

            case DISCONNECT:
            {
                if (socket != null) {
                    socket.disconnect();
                }
                if (channel != null) {
                    channel.leave()
                }
                socket = null;

                store.dispatch(disconnected())
                break;
            }

            case SEND_HELLO:
            {
                if (socket == null) {
                    return
                }

                channel.push(SEND_HELLO)
            }

            default:
                return next(action)
        }
    }
})()

export default socketMiddleware