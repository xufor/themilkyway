export const UPDATE_BAR_STATE = 'UPDATE_BAR_STATE';

export const updateBarState = (value) => {
    return({
        type: UPDATE_BAR_STATE,
        payload: value
    });
};