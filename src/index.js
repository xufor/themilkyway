import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage'
import promise from 'redux-promise-middleware';
import ReduxThunk from 'redux-thunk';
import ReduxToastr from 'react-redux-toastr';
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'tachyons';
import 'loaders.css';

import rootReducer from './reducers/essential';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['credentials']
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    composeEnhancers(
        applyMiddleware(promise, ReduxThunk, loadingBarMiddleware())
    )
);

export let persistor = persistStore(store);

const options = {
    okText: 'Proceed',
    cancelText: 'Cancel'
};

ReactDOM.render(
    <Provider store = { store }>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
        <ReduxToastr
            timeOut={3000}
            newestOnTop={true}
            preventDuplicates
            position='top-right'
            transitionIn='bounceInDown'
            transitionOut='bounceOutUp'
            closeOnToastrClick
            confirmOptions={options}
        />
    </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();

