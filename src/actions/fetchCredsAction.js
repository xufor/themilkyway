import axLib from 'axios';
export const FETCH_USER_CREDENTIALS = 'FETCH_USER_CREDENTIALS';

export const fetchUserCredentials = ({ email, password}) => {

	const responseFromServer = axLib.request({
		url: '/login',
		baseURL: 'http://localhost:5000/',
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		data: {
			email,
			password
		}
	});

	/*Below is the standard format of redux thunk.
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

