import { WINDOW_RESIZE, UPDATE } from '../constants';

export function windowResize({ w, h }) {
    return {
        type: WINDOW_RESIZE,
        payload: { w, h },
    };
}

export function update() {
    return {
        type: UPDATE,
    };
}
