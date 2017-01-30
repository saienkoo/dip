import {TOGGLE_LEFT_SIDEBAR, TOGGLE_RIGHT_SIDEBAR} from '../actions/sidebarsActions';

const initialState = {
    left: true,
    right: true
};

export default function sidebarsReducer(state = initialState, action) {

    switch (action.type) {
        case TOGGLE_LEFT_SIDEBAR: console.log(state);
            return {
                ...state,
                left: !state.left
            };

        case TOGGLE_RIGHT_SIDEBAR:
            return {
                ...state,
                right: !state.right
            };

        default:
            return state;

    }
}