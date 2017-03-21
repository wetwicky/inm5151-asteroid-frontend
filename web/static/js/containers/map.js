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
        const { w, h, playerId, name, players } = this.props
        const player = players[playerId]
        if (player == null) return null
        
        const transform = `translate(${ w / 2 } ${ h / 2 }) rotate(${player.direction} 15 16)`
        
        return (
            <Canvas { ...this.props }>
                {
                    Object.keys(players).map((pk, idx) => {
                        if (pk == playerId) return;
                        let p = players[pk]
                        let pt = `translate(${ w / 2 + (player.x - p.x) } ${ h / 2 + (player.y - p.y) }) rotate(${p.direction} 15 16)`
                        return (
                            <g>
                                {
                                    Object.keys(p.bullets).map((key, idx) => {
                                        let bullet = p.bullets[key]
                                        return (
                                            <rect x={ w / 2 + (player.x - bullet.x) } y={ h / 2 + (player.y - bullet.y) }
                                                  width="4" height="4" style={{ fill: "#FF8844" }} />
                                        )
                                    })
                                }
                                <path transform={ pt } width="30" height="32"
                                      strokeWidth="5" strokeMiterlimit="3" stroke="#FF8844"
                                      fill="#000000" d="M35,0 L0,15 L35,30 L32,27 L32,3"
                                      strokeLinecap="round" strokeLinejoin="round" />
                                <text x={ w / 2 + (player.x - p.x) + 15 } y={ h / 2 + (player.y - p.y + 60) }
                                      fontFamily="Verdana" fontSize="15" fill="#FF8844" fillOpacity="0.4"
                                      textAnchor="middle">
                                    { p.name }
                                </text>
                            </g>
                        )
                    })
                }
                
                <g>
                    {
                        Object.keys(player.bullets).map((key, idx) => {
                            let bullet = player.bullets[key]
                            return (
                                <rect x={ w / 2 + (player.x - bullet.x) } y={ h / 2 + (player.y - bullet.y) }
                                      width="4" height="4" style={{ fill: "#FFFFFF" }} /> 
                            )
                        })
                    }
                    <path transform={ transform } width="30" height="32"
                          strokeWidth="5" strokeMiterlimit="3" stroke="#FFFFFF"
                          fill="#000000" d="M35,0 L0,15 L35,30 L32,27 L32,3"
                          strokeLinecap="round" strokeLinejoin="round" />
                    <text x={ w / 2 + 15 } y={ h / 2 + 60 } fontFamily="Verdana" fontSize="15" fill="#FFFFFF"
                          fillOpacity="0.4" textAnchor="middle">
                        { player.name }
                    </text>
                })
                </g>
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
    playerId: React.PropTypes.string,
    name: React.PropTypes.string,
    players: React.PropTypes.object,
    windowResize: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
    w: state.game.w,
    h: state.game.h,
    playerId: state.player.id,
    name: state.game.name,
    players: state.game.players,
})

const mapDispatchToProps = (dispatch) => ({
    windowResize: (dimensions) => dispatch(windowResize(dimensions)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
