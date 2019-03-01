import { TAG_TOPIC_CHANGE } from '../actions/tagTopicAction';

export default (state = "", action) => {
    switch (action.type) {
        case TAG_TOPIC_CHANGE:
            return action.payload;
        default: return state;
    }
}