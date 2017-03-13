"use strict";

import {Socket} from 'phoenix'
import { connecting, connected, disconnect, disconnected } from '../actions'
import { updateOtherPlayer, playerLeft, getPlayers } from '../actions/player'
import { CONNECT, DISCONNECT, UPDATE_OTHER_PLAYER, UPDATE_PLAYER, UPDATE, GET_PLAYERS, PLAYER_LEFT } from "../constants/index";

const socketMiddleware = (function () {
    var socket = null
    var channel = null

    const onOpen = (ws, store, username) => event => {
        channel = socket.channel("player:default", {});
        channel.join()
            .receive('ok', resp => {
                // Tell the store we are connected
                console.log("Ok: ", resp)
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
        console.warn("Channel closed")
        store.dispatch(disconnected())
    }

    const onMessage = (ws, store) => event => {
        // Parse the JSON message received on the websocket
        var type = event.event
        var data = event.payload
        switch (type) {
            case UPDATE_OTHER_PLAYER:
                store.dispatch(updateOtherPlayer(data))
                break
            case GET_PLAYERS:
                store.dispatch(getPlayers(data))
                break
            case PLAYER_LEFT:
                console.warn(event)
                store.dispatch(playerLeft(data.id))
                break
            case undefined:
            case 'phx_close':
            case 'phx_reply':
                break
            case 'phx_error':
                console.error(event)
                break
            default:
                console.log('Received unknown message type: "' + type + '"')
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

            case UPDATE:
            {
                if (socket == null) {
                    return
                }
                
                let player = store.getState().player
                let payload = {
                    x: player.position.x,
                    y: player.position.y,
                    direction: player.speed.direction()
                }
                channel.push(UPDATE_PLAYER, payload)
                
                return next(action)
            }

            default:
                return next(action)
        }
    }
})()

export default socketMiddleware