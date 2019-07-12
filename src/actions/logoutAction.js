import ax from 'axios';

import { remote } from '../strings';
import { store } from '../index';

export const LOGOUT = 'LOGOUT';

export const logout = () => {

    const responseFromServer = ax.request({
        url: '/signout',
        baseURL: remote,
        method: 'get',
        headers: {
            'SAT': store.getState().credentials.access_token.slice(7),
            'SRT': store.getState().credentials.refresh_token.slice(7),
        }
    });
        return {
            type: LOGOUT,
            payload: responseFromServer,
        };
};