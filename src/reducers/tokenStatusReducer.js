import { vars } from '../strings';
import { FETCH_USER_RECS } from '../actions/fetchUserRecsAction';
import { RESET_TOKEN_STATUS } from '../actions/resetTokenStatusAction';
import { NET_ERR } from './showToastReducer';
import { REFRESH_TOKEN } from '../actions/refreshAction';

export const EXPIRED_TOKEN_RESPONSE = 'The token has expired. Please refresh it.';
export const REVOKED_TOKEN_RESPONSE = 'The token has been revoked. Please login again.';

export default (state = '', action) => {
    switch(action.type) {
        case RESET_TOKEN_STATUS: // helps resetting the token
            return '';
        case REFRESH_TOKEN + vars.r: // this means as good as revoked
            if(action.payload.response.data.message === EXPIRED_TOKEN_RESPONSE)
                return 'access_token_unrefreshable';
            break;
        case FETCH_USER_RECS + vars.r: // settings for elite endpoint
            if(action.payload.message !== NET_ERR && action.payload.response.data.message !== undefined)
                if(action.payload.response.data.message === EXPIRED_TOKEN_RESPONSE)
                    return 'access_token_expired';
                else if(action.payload.response.data.message === REVOKED_TOKEN_RESPONSE)
                    return 'access_token_revoked';
            break;
        default:
            return state
    }
    return state;
}