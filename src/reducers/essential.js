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
import tokenStatusReducer from './tokenStatusReducer';
import feedReducer from './feedReducer';
import targetUidReducer from './targetUidReducer';

const rootReducer = combineReducers({
	credentials: credentialReducer, 	// stores tokens, status and name
	searchString: searchReducer,		// stores search query string
	barState: barReducer,				// stores bar state
	userRecInfo: userRecReducer,		// search responses of elite endpoint
	tagTopic: tagTopicReducer,			// stores selected tag topic
	fetchedStory: storyReducer,			// stores recently fetched story
	showToast: showToastReducer,		// stores which type of toast to show
	isPending: isPendingReducer,		// a flag which is set when some crucial request is made
	registration: registerReducer,		// stores response of registration
	tokenStatus: tokenStatusReducer,	// stores the status of tokens i.e. expired or revoked
	feed: feedReducer,					// stores the feed for homepage
	targetUid: targetUidReducer,		// stores the uid of which the profile is to be viewed
	toastr: toastrReducer,
	loadingBar: loadingBarReducer,
});

export default rootReducer;
