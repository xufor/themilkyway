import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/essential.js';
import 'tachyons';
import 'loaders.css';

//This is a statement to enable redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//This is not what we saw in the tutorial but its something I read in the doumentation of redux.
const appStore = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(ReduxPromise, ReduxThunk)
    )
);

//store is a prop passed to Provider
ReactDOM.render(
    <Provider store = { appStore }>
        <App />
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();

export default appStore;