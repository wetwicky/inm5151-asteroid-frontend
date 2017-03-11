import React from 'react'
import {connect} from 'react-redux'
import {disconnect, sendHello} from '../actions'

let Game = ({onDisconnect, sendHello}) => {
    return (
        <div>
            <h1>Game here</h1>
            <button onClick={e => {
                sendHello()
            }}>
                Send hello
            </button>
            <button onClick={e => {
                onDisconnect()
            }}>
                Disconnect
            </button>
        </div>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onDisconnect: () => {
        dispatch(disconnect())
    },
    sendHello: () => {
        dispatch(sendHello())
    },
})

Game = connect(null, mapDispatchToProps)(Game)

export default Game
