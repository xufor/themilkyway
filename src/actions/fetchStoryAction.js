export const FETCH_REQUIRED_STORY = 'FETCH_REQUIRED_STORY';

export const fetchStoryAction = (string) => {
    return({
        type: FETCH_REQUIRED_STORY,
        payload: string
    });
};