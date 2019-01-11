import { combineReducers } from 'redux';
import credentialReducer from './credsReducer.js';

const rootReducer = combineReducers({
	credentials: credentialReducer
});

export default rootReducer;
