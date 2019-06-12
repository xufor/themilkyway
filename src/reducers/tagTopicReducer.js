import { TAG_TOPIC_CHANGE } from '../actions/tagTopicAction';

export default (state = '', action) => {
    if (action.type === TAG_TOPIC_CHANGE) {
        return action.payload;
    } else {
        return state;
    }
}