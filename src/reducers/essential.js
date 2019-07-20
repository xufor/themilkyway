import { combineReducers } from 'redux';
import { reducer as toastrReducer} from 'react-redux-toastr';
import { loadingBarReducer } from 'react-redux-loading-bar';

import credentialReducer from './credsReducer';
import searchReducer from './searchReducer';
import barReducer from './barReducer';
import userRecReducer from './userRecReducer';
import storyReducer from './storyReducer';
import showToastReducer from './showToastReducer';
import isPendingReducer from './isPendingReducer';
import tokenStatusReducer from './tokenStatusReducer';
import genreReducer from './genreReducer';
import feedReducer from './feedReducer';
import anomalyReducer from './anomalyReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
	credentials: credentialReducer, 	// stores tokens, status and name
	searchData: searchReducer,			// stores search results
	barState: barReducer,				// stores bar state
	userRecInfo: userRecReducer,		// search responses of elite endpoint
	fetchedStory: storyReducer,			// stores recently fetched story
	showToast: showToastReducer,		// stores which type of toast to show
	isPending: isPendingReducer,		// a flag which is set when some crucial request is made
	tokenStatus: tokenStatusReducer,	// stores the status of tokens i.e. expired or revoked
	feed: feedReducer,					// stores the feed for homepage
	genre: genreReducer,				// stores the results on a genre based search
	profile: profileReducer,				// stores recently fetched profile data
	anomaly: anomalyReducer,			// stores any anomalies
	toastr: toastrReducer,
	loadingBar: loadingBarReducer,
});

export default rootReducer;
