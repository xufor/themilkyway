import { vars } from '../strings';
import { FETCH_USER_FEED } from '../actions/fetchUserFeedAction';
import { APPEND_USER_FEED } from '../actions/fetchUserFeedAction';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_FEED + vars.f:
            return action.payload.data;
        case APPEND_USER_FEED + vars.f:
            return {results: [...state.results].concat(action.payload.data.results)};
        default:
            return state;
    }
}