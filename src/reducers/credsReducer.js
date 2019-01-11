import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';

export default (state = {}, action) => {
	switch(action.type) {
		case FETCH_USER_CREDENTIALS:
			return action.payload;
		default:
		  	return state;
	}
}