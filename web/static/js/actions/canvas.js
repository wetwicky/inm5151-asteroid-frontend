import { WINDOW_RESIZE, UPDATE } from '../constants';

export function windowResize({ w, h }) {
    return {
        type: WINDOW_RESIZE,
        payload: { w, h },
    };
}

export function update({ x, y, direction }) {
    return {
        type: UPDATE,
        payload: { x: x, y: y, direction: direction },
    };
}
