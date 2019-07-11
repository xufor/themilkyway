import { DISABLE_TOAST } from '../actions/disableToastAction';
import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { INIT_REGISTRATION } from '../actions/registerAction';
import { APPEND_USER_FEED, FETCH_USER_FEED } from '../actions/fetchUserFeedAction';
import { INIT_SUBMISSION } from '../actions/submitStoryAction';
import { LIKE_STORY } from '../actions/likeStoryAction';
import { UNLIKE_STORY } from '../actions/unlikeStoryAction';
import { APPEND_SEARCH_DATA } from '../actions/fetchSearchDataAction';
import { FOLLOW_USER } from '../actions/followAction';
import { UNFOLLOW_USER } from '../actions/unfollowAction';
import { APPEND_GENRE_DATA } from '../actions/fetchGenreDataAction';
import { UPDATE_PROFILE } from '../actions/updateProfileAction';
import { UPDATE_STORY } from '../actions/updateStoryAction';
import { DELETE_STORY } from '../actions/deleteStoryAction';
import { reloader } from '../common';
import { vars } from '../strings';


export const NET_ERR = 'Network Error';
export const OP_SCC = 'Operation successful.';
export const INCORRECT_PASSWORD = 'The provided password is incorrect.';
export const NO_ACCOUNT = 'Please create an account first.';
export const NOT_CONFIRMED = 'There is an inactive user already registered with this email.';
export const ALREADY_REGISTERED = 'There is an active user already registered with this email.';
export const NOT_BEFORE_A_DAY = 'Cannot submit next story before 24 hours.';
export const TITLE_TOO_LONG = 'Title of and below 7 words is allowed.';
export const SUMMARY_TOO_LONG = 'Summary of and below 80 words is allowed.';
export const STORY_TOO_LONG = 'Story of and below 10000 words is allowed.';
export const NO_MORE_FEED = 'Cannot generate more feed.';
export const NO_MORE_SEARCH_DATA = 'No more search data available.';
export const STORY_SUBMITTED = 'Story successfully submitted.';
export const CANNOT_LIKE_OWN = 'You cannot like your own story.';
export const CANNOT_UNLIKE_OWN = 'You cannot remove like from your own story.';
export const UNFOLLOW_SUCCESSFUL = 'Unfollow Successful.';
export const STORY_EDIT_SUCCESSFUL = 'Story successfully updated.';
export const FOLLOW_SUCCESSFUL = 'Follow Successful.';
export const UPDATE_SUCCESSFUL = 'Update successful.';
export const NO_MORE_GENRE_DATA = 'No more genre data available.';

export default (state = 'disabled', action) => {
    switch(action.type) {
        case DISABLE_TOAST:
            return 'disabled';
        case FETCH_USER_CREDENTIALS + vars.r:
            if(action.payload.message === NET_ERR)
                return 'nt-er';
            else if(action.payload.response.data.message === INCORRECT_PASSWORD)
                return 'in-pw';
            else if(action.payload.response.data.message === NO_ACCOUNT)
                return 'no-ac';
            break;
        case INIT_REGISTRATION + vars.r:
            if(action.payload.message === NET_ERR)
                return 'nt-er';
            else if(action.payload.response.data.message === NOT_CONFIRMED)
                return 'nt-co';
            else if(action.payload.response.data.message === ALREADY_REGISTERED)
                return 'ac-pr';
            break;
        case INIT_REGISTRATION + vars.f:
            if(action.payload.data.message === OP_SCC)
                return 'rg-sc';
            break;
        case FETCH_USER_FEED + vars.r:
            if(action.payload.message === NET_ERR)
                return 'nt-er';
            break;
        case APPEND_USER_FEED + vars.r:
            if(action.payload.response.data.message === NO_MORE_FEED)
                return 'no-fd';
            break;
        case INIT_SUBMISSION + vars.r:
            if(action.payload.message === NET_ERR)
                return 'nt-er';
            else if(action.payload.response.data.message === NOT_BEFORE_A_DAY)
                return 'nt-da';
            else if(action.payload.response.data.message === TITLE_TOO_LONG)
                return 'ti-lg';
            else if(action.payload.response.data.message === SUMMARY_TOO_LONG)
                return 'su-lg';
            else if(action.payload.response.data.message === STORY_TOO_LONG)
                return 'st-lg';
            break;
        case INIT_SUBMISSION + vars.f:
            if(action.payload.data.message === STORY_SUBMITTED)
                return 'st-sc';
            break;
        case LIKE_STORY + vars.r:
            if(action.payload.response.data.message === CANNOT_LIKE_OWN)
                return 'cn-li';
            break;
        case UNLIKE_STORY + vars.r:
            if(action.payload.response.data.message === CANNOT_UNLIKE_OWN)
                return 'cn-ul';
            break;
        case APPEND_SEARCH_DATA + vars.r:
            if(action.payload.response.data.message === NO_MORE_SEARCH_DATA)
                return 'no-sr';
            break;
        case UNFOLLOW_USER + vars.f:
            if(action.payload.data.message === UNFOLLOW_SUCCESSFUL)
                return 'uf-su';
            break;
        case FOLLOW_USER + vars.f:
            if(action.payload.data.message === FOLLOW_SUCCESSFUL)
                return 'fl-su';
            break;
        case APPEND_GENRE_DATA + vars.r:
            if(action.payload.response.data.message === NO_MORE_GENRE_DATA)
                return 'no-gr';
            break;
        case UPDATE_PROFILE + vars.f:
            if(action.payload.data.message === UPDATE_SUCCESSFUL) {
                reloader(1000);
                return 'up-su';
            }
            break;
        case DELETE_STORY + vars.f:
            if(action.payload.data.message === OP_SCC) {
                reloader(1000);
                return 'de-su';
            }
            break;
        case UPDATE_STORY + vars.f:
            if(action.payload.data.message === STORY_EDIT_SUCCESSFUL) {
                reloader(1000);
                return 'se-su';
            }
            break;
        default:
            return state;
    }
    return state;
}