import { combineReducers } from 'redux';
import { reducer as toastrReducer} from 'react-redux-toastr';
import { loadingBarReducer } from 'react-redux-loading-bar';

import credentialReducer from './credsReducer';
import searchReducer from './searchReducer';
import barReducer from './barReducer';
import userRecReducer from './userRecReducer';
import tagTopicReducer from './tagTopicReducer';
import storyReducer from './storyReducer';
import showToastReducer from './showToastReducer';
import isPendingReducer from './isPendingReducer';
import registerReducer from './registerReducer';

const rootReducer = combineReducers({
	credentials: credentialReducer,
	searchString: searchReducer,
	barState: barReducer,
	userRecLinks: userRecReducer,
	tagTopic: tagTopicReducer,
	fetchedStory: storyReducer,
	showToast: showToastReducer,
	isPending: isPendingReducer,
	registration: registerReducer,
	toastr: toastrReducer,
	loadingBar: loadingBarReducer,
});

export default rootReducer;
