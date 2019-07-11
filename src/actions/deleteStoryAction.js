import ax from 'axios';

import { remote } from '../strings';
import { store } from '../index';

export const DELETE_STORY = 'DELETE_STORY';

export const deleteStory = (sid) => {

    const responseFromServer = ax.request({
        url: '/story',
        baseURL: remote,
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().credentials.access_token
        },
        data: { sid }
    });

    return {
        type: DELETE_STORY,
        payload: responseFromServer,
    }
};