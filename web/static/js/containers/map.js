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
        const { w, h, x, y, orientation, name, players } = this.props
        const transform = `translate(${ w / 2 } ${ h / 2 }) rotate(${orientation} 15 16)`
        //console.log(`${name}:\t${x},${y} ${orientation}deg!`)
        return (
            <Canvas { ...this.props }>
                <path transform={ transform } width="30" height="32"
                      strokeWidth="5" strokeMiterlimit="3" stroke="#FFFFFF"
                      fill="#000000" d="M35,0 L0,15 L35,30 L32,27 L32,3"
                      strokeLinecap="round" strokeLinejoin="round" />
                {
                    Object.keys(players).map((pk, idx) => {
                        let p = players[pk]
                        let pt = `translate(${ w / 2 + (x - p.x) } ${ h / 2 + (y - p.y) }) rotate(${p.direction} 15 16)`
                        //console.log(`${p.name}:\t${p.x},${p.y} ${p.direction}deg`)
                        return (
                            <path transform={ pt } width="30" height="32"
                                  strokeWidth="5" strokeMiterlimit="3" stroke="#FF8844"
                                  fill="#000000" d="M35,0 L0,15 L35,30 L32,27 L32,3"
                                  strokeLinecap="round" strokeLinejoin="round" />
                        )
                    })
                }
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
    name: React.PropTypes.string,
    orientation: React.PropTypes.number,
    players: React.PropTypes.array,
    windowResize: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
    w: state.game.w,
    h: state.game.h,
    x: state.player.position.x,
    y: state.player.position.y,
    name: state.game.name,
    players: state.game.players,
    orientation: state.player.speed.direction()
})

const mapDispatchToProps = (dispatch) => ({
    windowResize: (dimensions) => dispatch(windowResize(dimensions)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)