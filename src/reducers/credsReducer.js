import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { sampleBio } from '../strings.js';

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
		bio: sampleBio,
		country: 'New Zealand',
		profession: 'Software Engineer'
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