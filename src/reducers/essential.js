import { combineReducers } from 'redux';
import credentialReducer from './credsReducer';
import searchReducer from './searchReducer';
import barReducer from './barReducer';

const rootReducer = combineReducers({
	credentials: credentialReducer,
	searchString: searchReducer,
	barState: barReducer,
});

export default rootReducer;
