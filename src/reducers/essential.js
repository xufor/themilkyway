import { combineReducers } from 'redux';
import credentialReducer from './credsReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
	credentials: credentialReducer,
	searchString: searchReducer
});

export default rootReducer;
