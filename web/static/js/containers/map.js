import React, { Component } from 'react'
import { connect } from 'react-redux'
import Canvas from '../components/canvas'
import { windowResize } from '../actions/canvas'
import { collisions } from '../actions/player'

class Map extends Component {
    componentDidMount() {
        addEventListener('resize', this.handleResize)
        setTimeout(() => this.handleResize(), 300)
        this.collisionInterval = setInterval(() => this.checkCollisions(), 1000/10)
    }

    componentWillUnmount() {
        removeEventListener('resize', this.handleResize)
        clearTimeout(this.collisionInterval)
    }

    render() {
        const { w, h, playerId, players, asteroids } = this.props
        const player = players[playerId]
        if (player == null) return null

        const transform = `translate(${ w / 2 } ${ h / 2 }) rotate(${player.direction} 15 16)`

        return (
            <Canvas { ...this.props }>
                {
                    Object.keys(players).map((pk, idx) => {
                        if (pk == playerId) return;
                        let p = players[pk]
                        let playerTransform = `translate(${ w / 2 + (player.x - p.x) } ${ h / 2 + (player.y - p.y) }) rotate(${p.direction} 15 16)`
                        return (
                            <g>
                                {
                                    Object.keys(p.bullets).map((key, idx) => {
                                        let bullet = p.bullets[key]
                                        return (
                                            <rect className="bullet"
                                                  id={ `bullet-${idx}` }
                                                  x={ w / 2 + (player.x - bullet.x) }
                                                  y={ h / 2 + (player.y - bullet.y) }
                                                  width="4"
                                                  height="4"
                                                  style={{ fill: "#FF8844" }} />
                                        )
                                    })
                                }
                                <path transform={ playerTransform }
                                      className="otherPlayer"
                                      id={ `otherPlayer-${idx}` }
                                      width="30"
                                      height="32"
                                      strokeWidth="5"
                                      strokeMiterlimit="3"
                                      stroke="#FF8844"
                                      fill="#000000"
                                      d="M35,0 L0,15 L35,30 L32,27 L32,3"
                                      strokeLinecap="round"
                                      strokeLinejoin="round" />
                                <text className="name"
                                      x={ w / 2 + (player.x - p.x) + 15 }
                                      y={ h / 2 + (player.y - p.y + 60) }
                                      fontFamily="Verdana"
                                      fontSize="15"
                                      fill="#FF8844"
                                      fillOpacity="0.4"
                                      textAnchor="middle">
                                    { p.name }
                                </text>
                            </g>
                        )
                    })
                }

                <g id="player">
                    {
                        Object.keys(player.bullets).map((key, idx) => {
                            let bullet = player.bullets[key]
                            return (
                                <rect className="playerBullet"
                                      id={ `playerBullet-${idx}` }
                                      x={ w / 2 + (player.x - bullet.x) }
                                      y={ h / 2 + (player.y - bullet.y) }
                                      width="4"
                                      height="4"
                                      style={{ fill: "#FFFFFF" }} />
                            )
                        })
                    }
                    <path transform={ transform }
                          className="playerShip"
                          id={ `playerShip` }
                          width="30"
                          height="32"
                          strokeWidth="5"
                          strokeMiterlimit="3"
                          stroke="#FFFFFF"
                          fill="#000000"
                          d="M35,0 L0,15 L35,30 L32,27 L32,3"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                    <text className="name"
                          x={ w / 2 + 15 }
                          y={ h / 2 + 60 }
                          fontFamily="Verdana"
                          fontSize="15"
                          fill="#FFFFFF"
                          fillOpacity="0.4"
                          textAnchor="middle">
                        { player.name }
                    </text>
                </g>

                <g>
                    {
                        Object.keys(asteroids).map((key, idx) => {
                            let asteroid = asteroids[key]
                            let asteroidSize = asteroid.size * 0.2
                            let asteroidTransform = `translate(${ w / 2 + (player.x - asteroid.x) } ${ h / 2 + (player.y - asteroid.y) }) rotate(${asteroid.direction} 15 16)`
                            let asteroidScaleTransform = `scale(${asteroidSize})`
                            return(<svg
                                    className="asteroid"
                                    id={ `asteroid-${idx}` }
                                x={ w / 2 + (player.x - asteroid.x) }
                                y={ h / 2 + (player.y - asteroid.y) }
                                transform={asteroidTransform}
                                enableBackground="new 0 0 512 512" >
                                    <g transform={asteroidScaleTransform}>
                                        <path
                                            className="asteroid"
                                            id={ `asteroid-${idx}-0` }
                                            d="M500.428,184.663c-14.266-34.961-36.953-59.602-53.562-59.602c-1.984,0-3.891,0.359-5.672,1.086   c-0.062,0.023-0.109,0.047-0.156,0.07l-24.532,10.766c-25.875-36.149-62-64.462-104.11-80.735c0.156-0.727,0.25-1.477,0.25-2.25   c0-5.891-4.781-10.672-10.672-10.672c-4.297,0-7.984,2.547-9.672,6.211c-19.906-5.633-40.922-8.648-62.641-8.648   c-15.032,0-29.735,1.461-43.969,4.219l-12.172-25.985c-4.438-9.492-15.844-14.461-29.985-14.453   c-10.25,0-21.922,2.609-33.422,7.992c-27.344,12.813-43.297,36.478-35.625,52.86l11.953,25.508   c-17.828,14.242-33.5,31.087-46.407,49.954c-1.969-2.242-4.828-3.664-8.047-3.664c-5.891,0-10.656,4.773-10.656,10.664   c0,4.953,3.375,9.102,7.938,10.305C10.626,191.483,0.001,229.781,0.001,270.563c0,17.281,1.906,34.125,5.531,50.312   c-3.297,1.812-5.531,5.312-5.531,9.344c0,5.891,4.766,10.656,10.656,10.656c0.109,0,0.219,0,0.312,0   c8.766,27.266,22.484,52.312,40.11,74.079l-11.547,13.656c-11.704,13.797-2.531,40.813,20.485,60.36   c14.078,11.969,30.094,18.359,43.078,18.359c8.234,0,15.266-2.578,19.797-7.922l15.329-18.125   c28.032,12.188,58.938,18.938,91.438,18.938c33.625,0,65.563-7.219,94.329-20.219c1.516,4.062,5.407,6.953,9.985,6.953   c5.891,0,10.672-4.781,10.672-10.672c0-2.156-0.656-4.188-1.766-5.875c34.984-19.86,64.25-48.642,84.688-83.268   c1.578,0.938,3.422,1.484,5.406,1.484c5.891,0,10.656-4.781,10.656-10.656c0-4.266-2.5-7.938-6.109-9.641   c12.031-25.531,19.5-53.641,21.344-83.266l40.141-17.141l0,0C515.757,261.094,516.397,223.812,500.428,184.663z M450.271,148.413   c2.484,1.719,5.969,4.68,10.062,9.492c7.609,8.969,14.844,21.328,20.344,34.812c5.5,13.492,8.984,27.384,9.797,39.118   c0.453,6.305,0.031,10.852-0.547,13.82c-2.5-1.719-5.969-4.68-10.062-9.492c-7.609-8.961-14.844-21.328-20.344-34.813   c-5.5-13.492-8.984-27.383-9.812-39.117C449.271,155.929,449.693,151.39,450.271,148.413z M98.314,47.686   c4.766-6.07,12.172-11.648,20.844-15.711c8.234-3.852,16.891-5.977,24.375-5.977l0,0l0,0c6.375,0,9.625,1.523,10.579,2.219   c-0.078,1.102-0.875,4.258-4.407,8.742c-4.781,6.07-12.188,11.648-20.859,15.703c-8.235,3.859-16.891,5.984-24.375,5.984   c-6.359,0-9.609-1.523-10.578-2.219C93.971,55.326,94.783,52.17,98.314,47.686z M106.564,485.534   c-0.484,0.172-1.547,0.469-3.469,0.469c-6.281,0-17.734-3.484-29.266-13.281c-7.297-6.203-12.984-13.531-16-20.642   c-2.219-5.234-2.172-8.484-1.953-9.578c0.469-0.188,1.547-0.484,3.469-0.484l0,0l0,0c6.281,0,17.719,3.484,29.266,13.282   c7.297,6.203,12.969,13.516,15.984,20.641C106.83,481.175,106.768,484.44,106.564,485.534z M450.49,265.453l-12.094,5.157   l-0.828,13.125c-3.281,52.828-26.376,101.984-65.001,138.423c-38.797,36.595-89.548,56.751-142.908,56.751   c-28.797,0-56.704-5.781-82.938-17.188l-14.531-6.312l-8.782,10.359c-4.281-9.203-11.438-18.61-20.984-26.735   c-9.594-8.141-20.078-13.688-29.891-16.406l6.219-7.375l-11.094-13.72c-14.704-18.156-26.157-38.438-34.032-60.281   c-8.156-22.625-12.297-46.406-12.297-70.688c0-32.235,7.156-63.127,21.266-91.822c13.469-27.367,33.235-51.938,57.157-71.048   l13.125-10.492l-7.125-15.219l-0.938-2.008c10.156-0.062,21.719-2.664,33.079-7.992c11.375-5.328,20.766-12.531,27.329-20.312   l1.156,2.492l7.062,15.055l16.312-3.164c13.125-2.547,26.547-3.836,39.907-3.836c17.157,0,34.204,2.086,50.657,6.203   c15.984,3.984,31.5,9.906,46.11,17.578c28.672,15.07,53.828,37.001,72.734,63.407l10.078,14.062l15.845-6.953l3.141-1.383   c-0.359,15.148,3.469,34.469,11.547,54.274c8.266,20.273,19.375,37.062,30.484,47.602L450.49,265.453z"
                                            fill="#FFFFFF" />
                                        <path
                                            className="asteroid"
                                            id={ `asteroid-${idx}-1` }
                                            d="M319.332,155.968c2.641-20.562-18.906-40.267-48.109-44.024c-3.266-0.422-6.5-0.625-9.641-0.625   c-25.063,0-45.704,12.79-48.048,31.056c-2.641,20.562,18.907,40.266,48.11,44.023c3.266,0.414,6.484,0.617,9.641,0.617   C296.348,187.015,316.973,174.226,319.332,155.968z M298.176,153.249c-0.422,3.219-3.828,5.836-5.828,7.109   c-5.312,3.391-12.984,5.328-21.062,5.328c-2.281,0-4.609-0.148-6.922-0.445c-19.078-2.453-30.485-13.75-29.672-20.148   c0.422-3.219,3.828-5.836,5.828-7.109c5.297-3.391,12.985-5.328,21.063-5.328c2.266,0,4.609,0.148,6.922,0.445   C287.582,135.554,298.988,146.851,298.176,153.249z"
                                            fill="#FFFFFF" />
                                        <path
                                            className="asteroid"
                                            id={ `asteroid-${idx}-2` }
                                            d="M326.036,312.626c-8.579,0-17.626,2.531-25.845,7.781c-20.109,12.875-27.562,37.156-16.625,54.234   c6.453,10.109,17.906,15.438,30.344,15.438c8.594,0,17.642-2.547,25.86-7.797c20.109-12.844,27.547-37.125,16.625-54.219   C349.927,317.938,338.489,312.626,326.036,312.626z M339.333,350.501c-1.641,5.344-5.672,10.375-11.062,13.812   c-4.47,2.859-9.563,4.438-14.36,4.438c-2.641,0-9.156-0.547-12.375-5.594c-2.516-3.922-1.656-8.562-0.906-10.969   c1.625-5.328,5.656-10.359,11.062-13.812c4.453-2.844,9.562-4.422,14.345-4.422h0.016c2.641,0,9.141,0.547,12.375,5.594   C340.927,343.47,340.067,348.095,339.333,350.501z"
                                            fill="#FFFFFF" />
                                        <path
                                            className="asteroid"
                                            id={ `asteroid-${idx}-3` }
                                            d="M153.862,217.977c-41.235,0-74.657,28.656-74.657,63.993c0,35.344,33.422,64,74.657,64   c41.234,0,74.657-28.656,74.657-64C228.519,246.633,195.097,217.977,153.862,217.977z M192.769,311.032   c-10.234,8.766-24.047,13.594-38.906,13.594c-14.86,0-28.673-4.828-38.907-13.594c-9.297-7.969-14.422-18.297-14.422-29.062   s5.125-21.079,14.422-29.048c10.234-8.781,24.047-13.609,38.907-13.609c14.859,0,28.672,4.828,38.906,13.609   c9.297,7.969,14.422,18.282,14.422,29.048S202.065,303.063,192.769,311.032z"
                                            fill="#FFFFFF" />
                                    </g>
                                </svg>
                            )
                        })
                    }
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

    checkCollisions = () => {
        let map = document.querySelector("#app > svg")
        let ship = document.querySelector("#app > svg > #player > path")
        let bullets = document.querySelectorAll("#app > svg > #player > rect")
        if (map == null || ship == null) {
            return
        }
        let rects = this.getCollisionRects(map, [ship,...bullets])
        const keepClasses = ["otherPlayer", "asteroid"]
        let allCollisions = []
        for (let rect of rects) {
            let collisionNodes = map.getIntersectionList(rect, map)

            // Convert NodeList to array
            var collisions = []
            for (var i = collisionNodes.length; i--; collisions.unshift(collisionNodes[i]));

            collisions = collisions.filter((c) =>
                keepClasses.includes(c.className.baseVal)
            )
            for (let c of collisions) {
                allCollisions.push(c)
            }
            if (collisions.length > 0) {
                console.log(collisions)
            }
        }

        let formattedData = []
        for (let c of allCollisions) {
            formattedData.push({
                type: c.className.baseVal,
                id: c.id.split('-')[1]
            })
        }
        if (formattedData.length > 0) {
            this.props.collisions(formattedData)
        }
    }

    getCollisionRects = (map, elements) => {
        let rects = []
        for (let element of elements) {
            let eBox = element.getBoundingClientRect()
            let rect = map.createSVGRect()
            rect.x = eBox.left
            rect.y = eBox.top
            rect.width = eBox.width
            rect.height = eBox.height
            rects.push(rect)
        }
        return rects
    }
}

Map.propTypes = {
    w: React.PropTypes.number,
    h: React.PropTypes.number,
    playerId: React.PropTypes.string,
    players: React.PropTypes.object,
    asteroids: React.PropTypes.object,
    windowResize: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
    w: state.game.w,
    h: state.game.h,
    playerId: state.player.id,
    players: state.game.players,
    asteroids: state.game.asteroids,
})

const mapDispatchToProps = (dispatch) => ({
    windowResize: (dimensions) => dispatch(windowResize(dimensions)),
    collisions: (collisionList) => dispatch(collisions(collisionList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
