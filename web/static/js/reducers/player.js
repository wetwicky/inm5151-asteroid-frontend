import { UPDATE } from '../constants'
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
    up: false
}, action) => {
    switch (action.type) {
        case UPDATE:
            let newState = {
                ...state,
                ...action.payload
            }
            
            let rotation = 0
            let thrusters = 0
            
            if (newState.left) {
                rotation -= 2
            }
            if (newState.right) {
                rotation += 2
            }
            if (newState.up) {
                thrusters = 1
            }
            
            newState.speed.setDirection(newState.speed.direction() + rotation)
            newState.position.addScaled(newState.speed, thrusters);
            
            return newState
        default:
            return state
    }
}

export default player;
