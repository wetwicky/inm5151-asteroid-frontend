import { App as AppComponent } from '../components/app'
import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  gameStarted: state.game.gameStarted,
})

App = connect(mapStateToProps)(AppComponent)

export default App
