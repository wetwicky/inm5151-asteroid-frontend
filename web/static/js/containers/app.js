//require('normalize.css/normalize.css');
//require('styles/App.css');

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Game from '../containers/game'
import Login from '../containers/login'

let App = ({ gameStarted,
             name }) => {
  console.log(gameStarted);
  if (gameStarted) {
    return <Game />
  } else {
    return <Login />
  }
}

const mapStateToProps = (state) => ({
  gameStarted: state.game.gameStarted,
  name: state.game.name
})

App = connect(mapStateToProps)(App)

export default App
