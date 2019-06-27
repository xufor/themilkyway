import { DISABLE_TOAST } from '../actions/disableToastAction';
import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { vars } from '../strings';

export const INCORRECT_PASSWORD = 'The provided password is incorrect.';
export const NO_ACCOUNT = 'Please create an account first.';

export default (state = 'disabled', action) => {
    if(action.type === DISABLE_TOAST)
        return 'disabled';
    else if(action.type === FETCH_USER_CREDENTIALS + vars.r)
        if(action.payload.message === 'Network Error')
            return 'network-error';
        else if(action.payload.response.data.message === undefined)
            return 'invalid-email';
        else if(action.payload.response.data.message === INCORRECT_PASSWORD)
            return 'incorrect-password';
        else if(action.payload.response.data.message === NO_ACCOUNT)
            return 'no-account';
    return state;
}