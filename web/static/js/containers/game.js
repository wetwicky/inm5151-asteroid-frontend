import React from 'react'
import { connect } from 'react-redux'
import { disconnect, sendHello } from '../actions'
import { Game as GameComponent } from '../components/game'

const mapDispatchToProps = (dispatch, ownProps) => ({
    onDisconnect: () => {
        dispatch(disconnect())
    },
    sendHello: () => {
        dispatch(sendHello())
    },
})

Game = connect(null, mapDispatchToProps)(GameComponent)

export default Game
