import ax from 'axios';

import { remote } from '../strings';
import { store } from '../index';

export const FETCH_SEARCH_DATA = 'FETCH_SEARCH_DATA';
export const APPEND_SEARCH_DATA = 'APPEND_SEARCH_DATA';

export const fetchSearchData = (version, content, string) => {

    const responseFromServer = ax.request({
        url: '/search',
        baseURL: remote,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().credentials.access_token
        },
        data: {
            version,
            content,
            string
        }
    });

    if(version === 1)
        return {
            type: FETCH_SEARCH_DATA,
            payload: responseFromServer,
        };
    else
        return {
            type: APPEND_SEARCH_DATA,
            payload: responseFromServer,
        };
};