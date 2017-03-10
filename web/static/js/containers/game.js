import React from 'react'
import { connect } from 'react-redux'
import { endGame } from '../actions'

let Game = ({ dispatch,
              name }) => {
  return (
      <div>
        <h1>
        Game here
        </h1>
        <button onClick={e => {
          dispatch(endGame())
        }}>
          Disconnect
        </button>
      </div>
    )
}

const mapStateToProps = (state) => ({
  name: state.game.name
})

Game = connect(mapStateToProps)(Game)

export default Game
