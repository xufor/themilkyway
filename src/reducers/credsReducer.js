import { FETCH_USER_CREDENTIALS } from '../actions/fetchCredsAction';
import { REFRESH_TOKEN } from '../actions/refreshAction';
import { vars } from '../strings';
import {ON_REVOKE} from "../actions/onRevokeAction";

export default (state = {}, action) => {
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