import { UPDATE } from '../constants'

const player = (state = {x: 0, y: 0, direction: 90}, action) => {
  switch (action.type) {
    case UPDATE:
      return {
          ...state,
          ...action.payload,
      }
    default:
      return state
  }
}

export default player;
