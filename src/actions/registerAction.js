import ax from 'axios';
import { remote } from '../strings';

export const INIT_REGISTRATION = 'INIT_REGISTRATION';


export const initiateRegistration = ({ email, password, name }) => {
    const responseFromServer = ax.request({
        url: '/signup',
        baseURL: remote,
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

