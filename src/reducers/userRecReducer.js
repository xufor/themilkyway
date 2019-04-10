import { FETCH_USER_RECS } from '../actions/fetchUserRecsAction';

export default (state = [], action) => {
    if (action.type === FETCH_USER_RECS) {
        return action.payload.data;
    } else {
        return state;
    }
}