import React from 'react'
import { connect } from 'react-redux'
import { disconnect, sendHello } from '../actions'
import GameComponent from '../components/game'

const mapDispatchToProps = (dispatch, ownProps) => ({
    onDisconnect: () => {
        dispatch(disconnect())
    },
    sendHello: () => {
        dispatch(sendHello())
    },
})


let Game = connect(null, mapDispatchToProps)(GameComponent)

export default Game
