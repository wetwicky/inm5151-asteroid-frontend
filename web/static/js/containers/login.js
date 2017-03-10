import React from 'react'
import { connect } from 'react-redux'
import { startGame } from '../actions'

let Login = ({ dispatch,
               name }) => {
  let input

  return (
      <div>
        <h1>Asteroid.io</h1>
        <form onSubmit={e => {
          e.preventDefault("a")
          
          if (!input.value.trim()) {
            return
          }
          dispatch(startGame(input.value))
        }}>
          <input ref={node => {
            input = node
          }}
            defaultValue={name}
          />
          <button type="submit">
            Play!
          </button>
        </form>
      </div>
    )
}

const mapStateToProps = (state) => ({
  name: state.game.name
})

Login = connect(mapStateToProps)(Login)

export default Login
