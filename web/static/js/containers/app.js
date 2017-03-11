import React from 'react'
import { connect } from 'react-redux'
import AppComponent from '../components/app'

const mapStateToProps = (state) => ({
  gameStarted: state.game.gameStarted,
})

let App = connect(mapStateToProps)(AppComponent)

export default App
