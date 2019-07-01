import ax from 'axios';

import { remote } from '../strings';

export const FETCH_USER_FEED = 'FETCH_USER_FEED';

export const fetchUserFeed = (access_token, version) => {

    const responseFromServer = ax.request({
        url: '/feed',
        baseURL: remote,
        method: 'post',
        headers: {'Content-Type': 'application/json', 'Authorization': access_token},
        data: { version }
    });

    return {
        type: FETCH_USER_FEED,
        payload: responseFromServer,
    };
};
