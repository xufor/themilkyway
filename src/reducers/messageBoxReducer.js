import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { vars } from '../strings';

export default (state = 'disabled', action) => {
    if (action.type === FETCH_USER_CREDENTIALS + vars.p)
        return 'enabled';
    else if (action.type === FETCH_USER_CREDENTIALS + vars.f)
        return 'disabled';
    else if(action.type === FETCH_USER_CREDENTIALS + vars.r)
        return 'disabled';
    return state
}

