import React, { Component } from 'react'
import { connect } from 'react-redux'
import Canvas from '../components/canvas'
import { windowResize } from '../actions/canvas'

const colors = ['#F5F5F5', '#212121'];

window.i = null;
window.x = 0;
window.y = 0;
window.verticalMomentum = 0;
window.horisontalMomentum = 0;

function update() {
    window.x += window.horisontalMomentum;
    window.y += window.verticalMomentum;
    document.getElementsByTagName('svg')[0].style.backgroundPositionY=window.y+"px";
    document.getElementsByTagName('svg')[0].style.backgroundPositionX=window.x+"px";
}

function onKeyDown(e) {
    console.log(e.keyCode)
    if (e.keyCode == 37) { // Left
        window.horisontalMomentum = 1
    } else if (e.keyCode == 38) { // Up
        window.verticalMomentum = 1
    } else if (e.keyCode == 39) { // Right
        window.horisontalMomentum = -1
    } else if (e.keyCode == 40) { // Down
        window.verticalMomentum = -1
    }
    if (window.i == null) {
        window.i = window.setInterval(update, 10)
    }
}

function onKeyUp(e) {
    if (e.keyCode == 37 && window.horisontalMomentum == 1) { // Left
        window.horisontalMomentum = 0
    } else if (e.keyCode == 38 && window.verticalMomentum == 1) { // Up
        window.verticalMomentum = 0
    } else if (e.keyCode == 39 && window.horisontalMomentum == -1) { // Right
        window.horisontalMomentum = 0
    } else if (e.keyCode == 40 && window.verticalMomentum == -1) { // Down
        window.verticalMomentum = 0
    }
}

class Map extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        setTimeout(() => this.handleResize(), 300)
        document.body.onkeydown = onKeyDown
        document.body.onkeyup = onKeyUp
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    
    render() {
        const { w, h } = this.props
        return (
            <Canvas { ...this.props }>
                {
                    
                }
                <image href="" x="0" y="0" height={ w } width={h}/>
            </Canvas>
        )
    }
    
    handleResize = () => {
        this.props.windowResize({
            width: window.innerWidth,
            height: window.innerHeight
        })
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
    windowResize: (dimensions) => dispatch(windowResize(dimensions))
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)