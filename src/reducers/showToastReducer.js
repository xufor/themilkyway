import { DISABLE_TOAST } from '../actions/disableToastAction';
import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { vars } from '../strings';

export const NET_ERR = 'Network Error';
export const INCORRECT_PASSWORD = 'The provided password is incorrect.';
export const NO_ACCOUNT = 'Please create an account first.';

export default (state = 'disabled', action) => {
    if(action.type === DISABLE_TOAST)
        return 'disabled';
    else if(action.type === FETCH_USER_CREDENTIALS + vars.r)
        if(action.payload.message === NET_ERR)
            return 'nt-er';
        else if(action.payload.response.data.message === INCORRECT_PASSWORD)
            return 'in-pw';
        else if(action.payload.response.data.message === NO_ACCOUNT)
            return 'no-ac';
    return state;
}