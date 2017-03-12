import React from 'react'
import { connect } from 'react-redux'
import { update, updateLeft, updateRight, updateUp } from '../actions/player'
import GameComponent from '../components/game'

const mapDispatchToProps = (dispatch, ownProps) => ({
    leftPressed: () => {
        dispatch(updateLeft(true))
    },
    rightPressed: () => {
        dispatch(updateRight(true))
    },
    upPressed: () => {
        dispatch(updateUp(true))
    },
    leftReleased: () => {
        dispatch(updateLeft(false))
    },
    rightReleased: () => {
        dispatch(updateRight(false))
    },
    upReleased: () => {
        dispatch(updateUp(false))
    },
    update: () => {
        dispatch(update())
    },
})

let Game = connect(null, mapDispatchToProps)(GameComponent)

export default Game
