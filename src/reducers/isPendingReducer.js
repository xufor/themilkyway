import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { vars } from '../strings';

export default (state = false, action) => {
    if (action.type === FETCH_USER_CREDENTIALS + vars.p)
        return true;
    else if (action.type === FETCH_USER_CREDENTIALS + vars.f)
        return false;
    else if(action.type === FETCH_USER_CREDENTIALS + vars.r)
        return false;
    return state
}

