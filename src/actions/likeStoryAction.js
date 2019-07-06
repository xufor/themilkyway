import ax from 'axios';

import { remote } from '../strings';
import { store } from '../index';

export const LIKE_STORY = 'LIKE_STORY';

export const likeStory = (sid) => {

    const responseFromServer = ax.request({
        url: '/like',
        baseURL: remote,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().credentials.access_token
        },
        data: { target: sid }
    });

    return {
        type: LIKE_STORY,
        payload: responseFromServer,
    }
};