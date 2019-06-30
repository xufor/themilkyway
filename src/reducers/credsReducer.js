import { sampleBio } from '../strings.js';
import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { REFRESH_TOKEN } from '../actions/refreshAction';
import { vars } from '../strings';
import {ON_REVOKE} from "../actions/onRevokeAction";

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
	switch (action.type) {
		case ON_REVOKE:
			return { ...state, message: 'Not signed in or is revoked.'};
		case FETCH_USER_CREDENTIALS + vars.f:
			action.payload.data.access_token = 'Bearer ' + action.payload.data.access_token;
			action.payload.data.refresh_token = 'Bearer ' + action.payload.data.refresh_token;
			return action.payload.data;
		case REFRESH_TOKEN + vars.f:
			// this will add the refreshed access_token to the credentials
			return { ...state, access_token: 'Bearer ' + action.payload.data.access_token};
		default:
			return state;
	}
}