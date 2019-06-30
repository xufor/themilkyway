import ax from 'axios';
import { remote } from '../strings';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';


export const refreshToken = (refresh_token) => {
    const responseFromServer = ax.request({
        url: '/refresh',
        baseURL: remote,
        method: 'get',
        headers: {'Authorization': refresh_token}
    });

    return {
        type: REFRESH_TOKEN,
        payload: responseFromServer,
    }
};