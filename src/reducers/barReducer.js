import { UPDATE_BAR_STATE } from '../actions/barStateAction';

export default (state = 'shrink-enabled', action) => {
    if (action.type === UPDATE_BAR_STATE) {
        return action.payload;
    } else {
        return state;
    }
}
