import React from 'react'
import { connect } from 'react-redux'
import { update, updateLeft, updateRight, updateUp, firePressed } from '../actions/player'
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
    spacePressed: () => {
        dispatch(firePressed(true))
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
    spaceReleased: () => {
        dispatch(firePressed(false))
    },
    update: () => {
        dispatch(update())
    },
})

let Game = connect(null, mapDispatchToProps)(GameComponent)

export default Game
