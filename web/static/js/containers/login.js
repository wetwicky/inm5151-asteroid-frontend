import React from 'react'
import { connect } from 'react-redux'
import { startGame } from '../actions'

let Login = ({ dispatch }) => {
  let input

  return (
      <div>
        <h1>Asteroid.io</h1>
        <form onSubmit={e => {
          e.preventDefault()
          
          if (!input.value.trim()) {
            return
          }

          dispatch(startGame(input.value))
        }}>
          <input ref={node => {
            input = node
          }} />
          <button type="submit">
            Play!
          </button>
        </form>
      </div>
    )
}
Login = connect()(Login)

export default Login
