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

	/*Below lies the standard format of redux thunk.
    You do not return an object  when using thunk.
    You return a function here with dispatch as parameter.
    Later on dispatch f/n is used to create an action.*/

	return (dispatch) => {
	    responseFromServer.then((responseFromServer) => dispatch({
                type: FETCH_USER_CREDENTIALS,
                payload: responseFromServer
		}))
	};
};

