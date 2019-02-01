export const UPDATE_SEARCH_STRING = 'UPDATE_SEARCH_STRING';

export const updateSearchString = (string) => {
    return({
        type: UPDATE_SEARCH_STRING,
        payload: string
    });
};