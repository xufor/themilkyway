import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { sampleBio } from '../strings.js';

let INITIAL_STATE = {
	verifiedFlag: null,
	data: {
		firstName: 'John',
		lastName: 'Seed',
		dob: '16, June 2000',
		followers: '50',
		following: '100',
		praises: '100',
		views: '500',
		bio: sampleBio,
		country: 'New Zealand',
		profession: 'Software Engineer',
		emailId: 'john_seed@gmail.com',
		milestones: '30K views 5K likes last month!',
		privacy: 'Secret',
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