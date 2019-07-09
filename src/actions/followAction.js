import ax from 'axios';

import { store } from '../index';
import { remote } from '../strings';

export const FOLLOW_USER = 'FOLLOW_USER';

export const followTarget = (uid) => {

    const responseFromServer = ax.request({
        url: '/follow',
        baseURL: remote,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().credentials.access_token
        },
        data: { target: uid }
    });

    return {
        type: FOLLOW_USER,
        payload: responseFromServer,
    }
};