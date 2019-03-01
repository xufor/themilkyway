export const TAG_TOPIC_CHANGE = 'TAG_TOPIC_CHANGE';

export const tagTopicAction = (string) => {
    return({
        type: TAG_TOPIC_CHANGE,
        payload: string
    });
};