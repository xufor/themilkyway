import { FETCH_REQUIRED_STORY } from '../actions/fetchStoryAction';
import { sampleStory } from '../strings';

export default (state = sampleStory, action) => {
    if (action.type === FETCH_REQUIRED_STORY) {
        return action.payload;
    } else {
        return state;
    }
}