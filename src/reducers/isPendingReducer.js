import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { INIT_REGISTRATION } from '../actions/registerAction';
import { FETCH_USER_FEED } from '../actions/fetchUserFeedAction';
import { UNLIKE_STORY } from '../actions/unlikeStoryAction';
import { LIKE_STORY } from '../actions/likeStoryAction';
import { vars } from '../strings';

export default (state = false, action) => {
    switch(action.type) {
        case FETCH_USER_CREDENTIALS + vars.p:
            return true;
        case FETCH_USER_CREDENTIALS + vars.f:
            return false;
        case FETCH_USER_CREDENTIALS + vars.r:
            return false;
        case INIT_REGISTRATION + vars.p:
            return true;
        case INIT_REGISTRATION + vars.f:
            return false;
        case INIT_REGISTRATION + vars.r:
            return false;
        case LIKE_STORY + vars.p:
            return true;
        case LIKE_STORY + vars.f:
            return false;
        case LIKE_STORY + vars.r:
            return false;
        case FETCH_USER_FEED + vars.p:
            return true;
        case FETCH_USER_FEED + vars.f:
            return false;
        case FETCH_USER_FEED + vars.r:
            return false;
        case UNLIKE_STORY + vars.p:
            return true;
        case UNLIKE_STORY + vars.f:
            return false;
        case UNLIKE_STORY + vars.r:
            return false;
        default:
            return state
    }
}

