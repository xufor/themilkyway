import ax from 'axios';

import { remote } from '../strings';
import { store } from '../index';

export const FETCH_PROFILE = 'FETCH_PROFILE';

export const fetchProfile = (uid) => {

    const responseFromServer = ax.request({
        url: '/profile',
        baseURL: remote,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':
                (uid === store.getState().credentials.uid)
                    ? store.getState().credentials.access_token
                    : null
        },
        data: { uid }
    });

    return {
        type: FETCH_PROFILE,
        payload: responseFromServer,
    }
};