import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { INIT_REGISTRATION } from '../actions/registerAction';
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
        default:
            return state
    }
}

