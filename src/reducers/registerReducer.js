import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { vars } from '../strings';


export default (state = {}, action) => {
    if (action.type === FETCH_USER_CREDENTIALS + vars.f) {
        return action.payload.data
    }
    return state;
}