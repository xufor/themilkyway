import { vars } from '../strings';
import {FETCH_PROFILE} from '../actions/fetchProfileAction';

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_PROFILE + vars.f:
            return action.payload.data;
        default:
            return state;
    }
}