import ax from 'axios';

import { remote } from '../strings';
import { store } from '../index';

export const INIT_SUBMISSION = 'INIT_SUBMISSION';

export const initiateSubmission = ({ title, summary, story, genre }) => {

    const responseFromServer = ax.request({
        url: '/submit',
        baseURL: remote,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().credentials.access_token
        },
        data: {
            title,
            summary,
            story,
            genre
        }
    });

    return {
        type: INIT_SUBMISSION,
        payload: responseFromServer,
    }
};