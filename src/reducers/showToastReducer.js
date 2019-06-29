import { DISABLE_TOAST } from '../actions/disableToastAction';
import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { INIT_REGISTRATION } from '../actions/registerAction';
import { vars } from '../strings';

export const NET_ERR = 'Network Error';
export const OP_SCC = 'Operation successful.';
export const INCORRECT_PASSWORD = 'The provided password is incorrect.';
export const NO_ACCOUNT = 'Please create an account first.';
export const NOT_CONFIRMED = 'There is an inactive user already registered with this email.';
export const ALREADY_REGISTERED = 'There is an active user already registered with this email.';

export default (state = 'disabled', action) => {
    switch(action.type) {
        case DISABLE_TOAST:
            return 'disabled';
        case FETCH_USER_CREDENTIALS + vars.r:
            if (action.payload.message === NET_ERR)
                return 'nt-er';
            else if (action.payload.response.data.message === INCORRECT_PASSWORD)
                return 'in-pw';
            else if (action.payload.response.data.message === NO_ACCOUNT)
                return 'no-ac';
            break;
        case INIT_REGISTRATION + vars.r:
            if (action.payload.message === NET_ERR)
                return 'nt-er';
            else if (action.payload.response.data.message === NOT_CONFIRMED)
                return 'nt-co';
            else if (action.payload.response.data.message === ALREADY_REGISTERED)
                return 'ac-pr';
            break;
        case INIT_REGISTRATION + vars.f:
            if (action.payload.data.message === OP_SCC)
                return 'rg-sc';
            break;
        default:
            return state;
    }
    return state;
}