import { vars } from '../strings';
import {FETCH_USER_FEED} from '../actions/fetchUserFeedAction';
import {NO_MORE_FEED} from "./showToastReducer";

export const NO_FEED_DATA_FIRST_ATTEMPT = 'No feed data on first attempt.';

export default (state = '', action) => {
    switch (action.type) {
        case FETCH_USER_FEED + vars.r:
            if (action.payload.response.data.message === NO_MORE_FEED)
                return NO_FEED_DATA_FIRST_ATTEMPT;
        default:
            return state;
    }
}