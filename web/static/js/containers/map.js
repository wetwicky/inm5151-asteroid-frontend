import React, { Component } from 'react'
import { connect } from 'react-redux'
import Canvas from '../components/canvas'
import { windowResize } from '../actions/canvas'

class Map extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        setTimeout(() => this.handleResize(), 300)
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    
    render() {
        const { w, h, orientation } = this.props
        console.log()
        const transform = `translate(${ w / 2 } ${ h / 2 }) rotate(${orientation} 15 16)`
        return (
            <Canvas { ...this.props }>
                <path transform={ transform } width="30" height="32"
                      strokeWidth="5" strokeMiterlimit="3" stroke="#FFFFFF"
                      fill="#000000" d="M35,0 L0,15 L35,30 L32,27 L32,3"
                      strokeLinecap="round" strokeLinejoin="round" />
            </Canvas>
        )
    }
    
    handleResize = () => {
        this.props.windowResize({
            w: window.innerWidth,
            h: window.innerHeight
        })
    }

}

Map.propTypes = {
    w: React.PropTypes.number,
    h: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    orientation: React.PropTypes.number,
    windowResize: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
    w: state.game.w,
    h: state.game.h,
    x: state.player.position.x,
    y: state.player.position.y,
    orientation: state.player.speed.direction()
})

const mapDispatchToProps = (dispatch) => ({
    windowResize: (dimensions) => dispatch(windowResize(dimensions)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)