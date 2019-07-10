import { vars } from '../strings';
import { FETCH_PROFILE } from '../actions/fetchProfileAction';

export const RESET_PROFILE_DATA = 'RESET_PROFILE_DATA';

export default (state = {}, action) => {
    switch(action.type) {
        case RESET_PROFILE_DATA:
            return {};
        case FETCH_PROFILE + vars.f:
            return action.payload.data;
        default:
            return state;
    }
}