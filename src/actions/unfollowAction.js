import ax from 'axios';

import { store } from '../index';
import { remote } from '../strings';

export const UNFOLLOW_USER = 'UNFOLLOW_USER';

export const unfollowTarget = (uid) => {

    const responseFromServer = ax.request({
        url: '/follow',
        baseURL: remote,
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().credentials.access_token
        },
        data: { target: uid }
    });

    return {
        type: UNFOLLOW_USER,
        payload: responseFromServer,
    }
};