export const MESSAGE_BOX_VIEW_CHANGE = 'MESSAGE_BOX_VIEW_CHANGE';

export const messageBoxViewAction = (string) => {
    return({
        type: MESSAGE_BOX_VIEW_CHANGE,
        payload: string
    });
};