import { combineReducers } from 'redux';
import credentialReducer from './credsReducer';
import searchReducer from './searchReducer';
import barReducer from './barReducer';
import userRecReducer from './userRecReducer';
import tagTopicReducer from './tagTopicReducer';
import messageBoxReducer from './messageBoxReducer';

const rootReducer = combineReducers({
	credentials: credentialReducer,
	searchString: searchReducer,
	barState: barReducer,
	userRecLinks: userRecReducer,
	tagTopic: tagTopicReducer,
	messageBoxState: messageBoxReducer
});

export default rootReducer;
