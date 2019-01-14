import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';

let INITIAL_STATE = {
	verifiedFlag: null,
	data: {
		name: 'John Seed',
		dob: '16, June 2000'
	}
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case FETCH_USER_CREDENTIALS:
			return {
				verifiedFlag: true,
				data: action.payload.data
			};
		default:
		  	return state;
	}
}