import React, { Component } from 'react'
import Map from '../containers/map'

class Game extends Component {

    constructor(props) {
        super(props)
        
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
    }
    
    componentDidMount() {
        document.body.addEventListener('keydown', this.onKeyDown)
        document.body.addEventListener('keyup', this.onKeyUp)
        this.interval = window.setInterval(this.props.update, 1000/60)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('keyup', this.onKeyUp)
        window.clearInterval(this.interval)
    }
    
    onKeyDown(e) {
        console.log(this)
        console.log(this.props)
        if (e.keyCode == 37) { // Left
            this.props.leftPressed()
        } else if (e.keyCode == 38) { // Up
            this.props.upPressed()
        } else if (e.keyCode == 39) { // Right
            this.props.rightPressed()
        }
    }

    onKeyUp(e) {
        if (e.keyCode == 37) { // Left
            this.props.leftReleased()
        } else if (e.keyCode == 38) { // Up
            this.props.upReleased()
        } else if (e.keyCode == 39) { // Right
            this.props.rightReleased()
        }
    }

    render() {
        return (
            <Map />
        )
    }
}

export default Game
