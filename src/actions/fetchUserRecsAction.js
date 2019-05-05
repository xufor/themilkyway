import axLib from 'axios';
export const FETCH_USER_RECS = 'FETCH_USER_RECS';

export const fetchUserRecsAction = () => {

    const response = axLib.get('https://cors-anywhere.herokuapp.com/https://themilkyway-api.herokuapp.com/user-recs');

    return (dispatch) => {
        response.then((response) => dispatch({
            type: FETCH_USER_RECS,
            payload: response
        }))
    };
};

