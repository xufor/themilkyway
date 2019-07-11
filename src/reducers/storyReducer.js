import { vars } from '../strings';
import { FETCH_STORY } from '../actions/fetchStoryAction';

export const RESET_STORY_DATA = 'RESET_STORY_DATA';

export default (state = {}, action) => {
    switch(action.type) {
        case RESET_STORY_DATA:
            return {};
        case FETCH_STORY + vars.f:
            return action.payload.data;
        default:
            return state;
    }
}