import { vars } from '../strings';
import { FETCH_STORY } from '../actions/fetchStoryAction';

export const INVERT_ALREADY_LIKED = 'INVERT_ALREADY_LIKED';

export default (state = null, action) => {
    switch(action.type) {
        case FETCH_STORY + vars.f:
            return action.payload.data;
        default:
            return state;
    }
}