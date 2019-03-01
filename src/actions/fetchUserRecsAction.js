import axLib from 'axios';
export const FETCH_USER_RECS = 'FETCH_USER_RECS';

export const fetchUserRecsAction = () => {

    const response = axLib.get('http://localhost:5000/user-recs');

    return (dispatch) => {
        response.then((response) => dispatch({
            type: FETCH_USER_RECS,
            payload: response
        }))
    };
};

