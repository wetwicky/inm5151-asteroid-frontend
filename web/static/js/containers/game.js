import React from 'react'
import { connect } from 'react-redux'
import { endGame } from '../actions'

let Game = ({ dispatch }) => {
  return (
      <div>
        <h1>Game here</h1>
        <button onClick={e => {
          dispatch(endGame())
        }}>
          Disconnect
        </button>
      </div>
    )
}
Game = connect()(Game)

export default Game
