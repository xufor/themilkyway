import { combineReducers } from 'redux';
import { reducer as toastrReducer} from 'react-redux-toastr';

import credentialReducer from './credsReducer';
import searchReducer from './searchReducer';
import barReducer from './barReducer';
import userRecReducer from './userRecReducer';
import tagTopicReducer from './tagTopicReducer';
import storyReducer from './storyReducer';
import messageBoxReducer from './messageBoxReducer';
import showToastReducer from './showToastReducer';

const rootReducer = combineReducers({
	credentials: credentialReducer,
	searchString: searchReducer,
	barState: barReducer,
	userRecLinks: userRecReducer,
	tagTopic: tagTopicReducer,
	fetchedStory: storyReducer,
	messageBoxState: messageBoxReducer,
	toastr: toastrReducer,
	showToast: showToastReducer

});

export default rootReducer;
