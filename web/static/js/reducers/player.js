import { UPDATE, BASE_SPEED, BASE_ROTATION_SPEED } from '../constants'
import Vec2 from '../util/vec2d'

window.speedMomentum = 0
window.rotationMomentum = 90

window.position = new Vec2(0, 0)
window.speed = new Vec2.fromDirection(90, 1)

const player = (state = {
    position: new Vec2(0, 0),
    speed: new Vec2.fromDirection(90, 1),
    left: false,
    right: false,
    up: false,
    lastUpdate: null
}, action) => {
    switch (action.type) {
        case UPDATE:
            let newState = {
                ...state,
                ...action.payload,
                lastUpdate: new Date().getTime()
            }

            let delta = 0
            if (state.lastUpdate != null) {
                delta = newState.lastUpdate - state.lastUpdate
            }
            let deltaPercent = delta / (1000 / 60)
            
            let rotation = 0
            let thrusters = 0
            
            if (newState.left) {
                rotation -= 1
            }
            if (newState.right) {
                rotation += 1
            }
            if (newState.up) {
                thrusters = 1
            }
            
            let newDirection = newState.speed.direction() +
                rotation * BASE_ROTATION_SPEED * deltaPercent
            newState.speed.setDirection(newDirection)
            let speedFactor = thrusters * BASE_SPEED * deltaPercent
            newState.position.addScaled(newState.speed, speedFactor)
            
            return newState
        default:
            return state
    }
}

export default player;
