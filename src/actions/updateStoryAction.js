import ax from 'axios';

import { remote } from '../strings';
import { store } from '../index';

export const UPDATE_STORY = 'UPDATE_STORY';

export const updateStory = (sid, title, summary, story, genre) => {

    const responseFromServer = ax.request({
        url: '/story',
        baseURL: remote,
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().credentials.access_token
        },
        data: {
            sid,
            title,
            summary,
            story,
            genre
        }
    });

    return {
        type: UPDATE_STORY,
        payload: responseFromServer,
    }
};