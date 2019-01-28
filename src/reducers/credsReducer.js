import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';

let INITIAL_STATE = {
	verifiedFlag: null,
	data: {
		fname: 'John',
		sname: 'Seed',
		dob: '16, June 2000',
		followers: '50',
		following: '100',
		praises: '100',
		views: '500',
		bio: 'I am a tech enthusiast from Germany, love to code, make friends and have fun!',
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