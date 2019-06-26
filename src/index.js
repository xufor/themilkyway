import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage'
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/essential';
import 'tachyons';
import 'loaders.css';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['messageBoxState', 'barState', 'tagTopic', 'searchString']
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    persistedReducer,
    composeEnhancers(
        applyMiddleware(ReduxPromise, ReduxThunk)
    )
);
let persistor = persistStore(store);


ReactDOM.render(
    <Provider store = { store }>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();

