import React, { Component } from 'react'
import { connect } from 'react-redux'
import Canvas from '../components/canvas'
import { windowResize, update } from '../actions/canvas'
import Vec2 from '../util/vec2d'

window.i = null
window.speedMomentum = 0
window.rotationMomentum = 90

window.position = new Vec2(0, 0)
window.speed = new Vec2.fromDirection(90, 1)


class Map extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        setTimeout(() => this.handleResize(), 300)
        document.body.onkeydown = this.onKeyDown
        document.body.onkeyup = this.onKeyUp
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    
    render() {
        const { w, h } = this.props
        const transform = `translate(${ w / 2 } ${ h / 2 }) rotate(0)`
        return (
            <Canvas { ...this.props }>
                <path transform={ transform } width="80" height="25" strokeWidth="5" strokeMiterlimit="3" stroke="#FFFFFF" fill="#000000" d="M0,35 L15,0 L30,35 L27,32 L3,32 " strokeLinecap="round" strokeLinejoin="round" />
            </Canvas>
        )
    }
    
    handleResize = () => {
        this.props.windowResize({
            w: window.innerWidth,
            h: window.innerHeight
        })
    }

    updatePlayer() {
        window.speed.setDirection(window.speed.direction() + window.rotationMomentum)
        window.position.addScaled(speed, window.speedMomentum);
        document.getElementsByTagName('svg')[0].style.backgroundPositionX=window.position.x+"px"
        document.getElementsByTagName('svg')[0].style.backgroundPositionY=window.position.y+"px"
    }

    onKeyDown(e) {
        console.log(e.keyCode)
        if (e.keyCode == 37) { // Left
            window.rotationMomentum = -1
        } else if (e.keyCode == 38) { // Up
            window.speedMomentum = 1
        } else if (e.keyCode == 39) { // Right
            window.rotationMomentum = 1
        }

        if (window.i == null) {
            window.i = window.setInterval(this.updatePlayer, 10)
        }
    }

    onKeyUp(e) {
        if (e.keyCode == 37 && window.rotationMomentum == -1) { // Left
            window.rotationMomentum = 0
        } else if (e.keyCode == 38 && window.speedMomentum == 1) { // Up
            window.speedMomentum = 0
        } else if (e.keyCode == 39 && window.rotationMomentum == 1) { // Right
            window.rotationMomentum = 0
        }

        if (window.rotationMomentum == 0 && window.speedMomentum == 0 && window.i != null) {
            window.clearInterval(window.i)
            window.i = null
        }
    }
}

Map.propTypes = {
    w: React.PropTypes.number,
    h: React.PropTypes.number,
    windowResize: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
    w: state.game.w,
    h: state.game.h,
    x: state.player.x,
    y: state.player.y
})

const mapDispatchToProps = (dispatch) => ({
    windowResize: (dimensions) => dispatch(windowResize(dimensions)),
    update: (x, y, direction) => dispatch(update(x, y, direction))
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)