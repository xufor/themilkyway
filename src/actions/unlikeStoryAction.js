import ax from 'axios';

import { remote } from '../strings';
import { store } from '../index';

export const UNLIKE_STORY = 'UNLIKE_STORY';

export const unlikeStory = (sid) => {

    const responseFromServer = ax.request({
        url: '/like',
        baseURL: remote,
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().credentials.access_token
        },
        data: { target: sid }
    });

    return {
        type: UNLIKE_STORY,
        payload: responseFromServer,
    }
};