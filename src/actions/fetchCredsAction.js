import ax from 'axios';
import { baseUrl } from '../strings';

export const FETCH_USER_CREDENTIALS = 'FETCH_USER_CREDENTIALS';


export const fetchUserCredentials = ({ email, password }) => {
	const responseFromServer = ax.request({
		url: '/signin',
		baseURL: baseUrl,
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		data: {
			email,
			password
		}
	});

	return {
	    type: FETCH_USER_CREDENTIALS,
        payload: responseFromServer,
    }
};

