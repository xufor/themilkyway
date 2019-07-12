import ax from 'axios';
import { remote } from '../strings';

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';


export const updatePassword = (password, token) => {
    const responseFromServer = ax.request({
        url: '/change',
        baseURL: remote,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            password,
            token
        }
    });

    return {
        type: UPDATE_PASSWORD,
        payload: responseFromServer,
    }
};