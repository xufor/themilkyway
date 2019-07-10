import ax from 'axios';

import { remote } from '../strings';
import { store } from '../index';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const updateProfile = (bio, dob, country, profession, prefString, image, checked) => {

    const responseFromServer = ax.request({
        url: '/profile',
        baseURL: remote,
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': store.getState().credentials.access_token
        },
        data: {
            bio,
            dob,
            profession,
            preferences: prefString,
            image,
            country,
            private: checked
        }
    });

    return {
        type: UPDATE_PROFILE,
        payload: responseFromServer,
    }
};