import { vars } from '../strings';
import { FETCH_USER_FEED } from '../actions/fetchUserFeedAction';
import { APPEND_USER_FEED } from '../actions/fetchUserFeedAction';

export const RESET_USER_FEED = 'RESET_USER_FEED';

export default (state = {}, action) => {
    switch (action.type) {
        case RESET_USER_FEED:
            return {};
        case FETCH_USER_FEED + vars.f:
            return action.payload.data;
        case APPEND_USER_FEED + vars.f:
            return {results: [...state.results].concat(action.payload.data.results)};
        default:
            return state;
    }
}