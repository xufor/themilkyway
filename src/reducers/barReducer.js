import { UPDATE_BAR_STATE } from '../actions/barStateAction';

export default (state = 'shrink-enabled', action) => {
    switch(action.type) {
        case UPDATE_BAR_STATE:
            return action.payload;
        default:
            return state;
    }
}
