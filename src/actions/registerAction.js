import ax from 'axios';
import { baseUrl } from '../strings';

export const INIT_REGISTRATION = 'INIT_REGISTRATION';


export const initiateRegistration = ({ email, password, name }) => {
    const responseFromServer = ax.request({
        url: '/signup',
        baseURL: baseUrl,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            email,
            password,
            name
        }
    });

    return {
        type: INIT_REGISTRATION,
        payload: responseFromServer,
    }
};

