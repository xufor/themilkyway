import ax from 'axios';

import { remote } from '../strings';

export const FETCH_USER_RECS = 'FETCH_USER_RECS';

export const fetchUserRecs = (access_token) => {

    const responseFromServer = ax.request({
        url: '/elite',
        baseURL: remote,
        method: 'get',
        headers: {'Authorization': access_token}
    });

    return {
        type: FETCH_USER_RECS,
        payload: responseFromServer,
    };
};

