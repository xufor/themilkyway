import { combineReducers } from 'redux';
import credentialReducer from './credsReducer';
import searchReducer from './searchReducer';
import barReducer from './barReducer';
import userRecReducer from './userRecReducer';
import tagTopicReducer from './tagTopicReducer';
import messageBoxReducer from './messageBoxReducer';
import storyReducer from './storyReducer';

const rootReducer = combineReducers({
	credentials: credentialReducer,
	searchString: searchReducer,
	barState: barReducer,
	userRecLinks: userRecReducer,
	tagTopic: tagTopicReducer,
	messageBoxState: messageBoxReducer,
	fetchedStory: storyReducer
});

export default rootReducer;
