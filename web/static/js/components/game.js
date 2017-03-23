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
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('keyup', this.onKeyUp)
    }
    
    onKeyDown(e) {
        if (e.repeat) {
            e.preventDefault()
            return
        }

        console.log("key down:", e);
        if (e.keyCode == 37 || e.keyCode == 65) { // Left
            this.props.leftPressed()
        } else if (e.keyCode == 38 || e.keyCode == 188) { // Up
            this.props.upPressed()
        } else if (e.keyCode == 39 || e.keyCode == 69) { // Right
            this.props.rightPressed()
        } else if (e.keyCode == 32) { // Space
            this.props.spacePressed()
        }
    }

    onKeyUp(e) {
        console.log("key up:", e);
        if (e.keyCode == 37 || e.keyCode == 65) { // Left
            this.props.leftReleased()
        } else if (e.keyCode == 38 || e.keyCode == 188) { // Up
            this.props.upReleased()
        } else if (e.keyCode == 39 || e.keyCode == 69) { // Right
            this.props.rightReleased()
        } else if (e.keyCode == 32) { // Space
            this.props.spaceReleased()
        }

    }

    render() {
        return (
            <Map />
        )
    }
}

export default Game
