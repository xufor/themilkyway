import ax from 'axios';

import { store } from '../index';
import { remote } from '../strings';

export const FETCH_USER_RECS = 'FETCH_USER_RECS';

export const fetchUserRecs = () => {

    const responseFromServer = ax.request({
        url: '/elite',
        baseURL: remote,
        method: 'get',
        headers: {
            'Authorization': store.getState().credentials.access_token
        },
    });

    return {
        type: FETCH_USER_RECS,
        payload: responseFromServer,
    };
};

