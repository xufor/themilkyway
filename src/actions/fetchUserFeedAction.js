import ax from 'axios';

import { remote } from '../strings';
import { store } from '../index';

export const FETCH_USER_FEED = 'FETCH_USER_FEED';
export const APPEND_USER_FEED = 'APPEND_USER_FEED';

export const fetchUserFeed = (version) => {

    const responseFromServer = ax.request({
        url: '/feed',
        baseURL: remote,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().credentials.access_token
        },
        data: { version }
    });

    if(version === 1)
        return {
            type: FETCH_USER_FEED,
            payload: responseFromServer,
        };
    else
        return {
            type: APPEND_USER_FEED,
            payload: responseFromServer,
        };
};
