import ax from 'axios';

import { remote } from '../strings';
import { store } from '../index';

export const FETCH_STORY = 'FETCH_STORY';

export const fetchStory = (sid) => {

    const responseFromServer = ax.request({
        url: '/read',
        baseURL: remote,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().credentials.access_token
        },
        data: { target: sid }
    });

    return {
        type: FETCH_STORY,
        payload: responseFromServer,
    }
};