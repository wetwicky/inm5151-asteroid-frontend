import React from 'react'
import Game from '../containers/game'
import Login from '../containers/login'

let App = ({ gameStarted }) => {
    if (gameStarted) {
        return <Game />
    } else {
        return <Login />
    }
}

export default App