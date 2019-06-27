import { sampleBio } from '../strings.js';
import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { vars } from '../strings';

let INITIAL_STATE = {
		uid: 'd76wef78',
		name: 'John Seed',
		dob: '16, June 2000',
		followers: '50k',
		following: '1k',
		points: '100k',
		views: '500m',
		bio: sampleBio,
		country: 'New Orleans',
		profession: 'Architect',
		emailId: 'john_seed@gmail.com',
		milestones: '30K views 5K points last month!',
};

export default (state = INITIAL_STATE, action) => {
	if (action.type === FETCH_USER_CREDENTIALS + vars.f) {
		return action.payload.data
	}
	return state;
}