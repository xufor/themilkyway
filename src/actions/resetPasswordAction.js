import ax from 'axios';
import { remote } from '../strings';

export const PASSWORD_RESET_REQ = 'PASSWORD_RESET_REQ';


export const requestResetPassword = (email) => {
    const responseFromServer = ax.request({
        url: '/reset',
        baseURL: remote,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            email
        }
    });

    return {
        type: PASSWORD_RESET_REQ,
        payload: responseFromServer,
    }
};