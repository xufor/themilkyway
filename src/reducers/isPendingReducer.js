import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { INIT_REGISTRATION } from '../actions/registerAction';
import { FETCH_USER_FEED } from '../actions/fetchUserFeedAction';
import { FETCH_SEARCH_DATA } from '../actions/fetchSearchDataAction';
import { UNLIKE_STORY } from '../actions/unlikeStoryAction';
import { UNFOLLOW_USER } from '../actions/unfollowAction';
import { FOLLOW_USER } from '../actions/followAction';
import { LIKE_STORY } from '../actions/likeStoryAction';
import { FETCH_GENRE_DATA } from '../actions/fetchGenreDataAction';
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
        case FETCH_SEARCH_DATA + vars.p:
            return true;
        case FETCH_SEARCH_DATA + vars.f:
            return false;
        case FETCH_SEARCH_DATA + vars.r:
            return false;
        case UNFOLLOW_USER + vars.p:
            return true;
        case UNFOLLOW_USER + vars.f:
            return false;
        case UNFOLLOW_USER + vars.r:
            return false;
        case FOLLOW_USER + vars.p:
            return true;
        case FOLLOW_USER + vars.f:
            return false;
        case FOLLOW_USER + vars.r:
            return false;
        case FETCH_GENRE_DATA + vars.p:
            return true;
        case FETCH_GENRE_DATA + vars.f:
            return false;
        case FETCH_GENRE_DATA + vars.r:
            return false;
        default:
            return state
    }
}

