import { FETCH_USER_RECS } from '../actions/fetchUserRecs';

export default (state = [], action) => {
    switch(action.type) {
        case FETCH_USER_RECS:
            return action.payload.data;
        default:
            return state;
    }
}