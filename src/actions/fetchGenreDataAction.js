import ax from 'axios';

import { remote } from '../strings';
import { store } from '../index';

export const FETCH_GENRE_DATA = 'FETCH_GENRE_DATA';
export const APPEND_GENRE_DATA = 'APPEND_GENRE_DATA';

export const fetchGenreData = (version, genre) => {

    const responseFromServer = ax.request({
        url: '/genre',
        baseURL: remote,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().credentials.access_token
        },
        data: {
            version,
            genre
        }
    });

    if(version === 1)
        return {
            type: FETCH_GENRE_DATA,
            payload: responseFromServer,
        };
    else
        return {
            type: APPEND_GENRE_DATA,
            payload: responseFromServer,
        };
};