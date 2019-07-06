import { vars } from '../strings';
import { FETCH_USER_FEED } from '../actions/fetchUserFeedAction';
import { NO_MORE_FEED } from './showToastReducer';
import { FETCH_STORY } from '../actions/fetchStoryAction';

export const NO_FEED_DATA_FIRST_ATTEMPT = 'No feed data on first attempt.';
export const INVALID_SID = 'Longer than maximum length 8.';
export const INVALID_REQ = 'Invalid request.';
export const RESET_ANOMALY = 'RESET_ANOMALY';

export default (state = '', action) => {
    switch (action.type) {
        case RESET_ANOMALY:
            return '';
        case FETCH_USER_FEED + vars.r:
            if (action.payload.response.data.message === NO_MORE_FEED)
                return NO_FEED_DATA_FIRST_ATTEMPT;
            break;
        case FETCH_STORY + vars.r:
            if (action.payload.response.data.target && action.payload.response.data.target[0] === INVALID_SID)
                return INVALID_SID;
            else if(action.payload.response.data.message === INVALID_REQ)
                return INVALID_REQ;
            break;
        default:
            return state;
    }
}