import { MESSAGE_BOX_VIEW_CHANGE } from '../actions/messageBoxViewAction';

export default (state = 'disabled', action) => {
    if (action.type === MESSAGE_BOX_VIEW_CHANGE) {
        return action.payload
    } else {
        return state;
    }
}