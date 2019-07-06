import React from 'react';
import { store } from './index';
import { Redirect } from 'react-router-dom';
import { ACCEPTABLE_RESPONSE_MESSAGE } from './components/loginPage/loginPage';
import { RESET_ANOMALY } from './reducers/anomalyReducer';
import BlackScreen from './components/blackScreen/blackScreen';
import MessageBox from './components/messageBox/messageBox';

export const displayLoader = (message, mode, confirmListener) => {
    return (
        <React.Fragment>
            <MessageBox
                message={message}
                mode={mode}
                confirmListener={confirmListener}
            />
            <BlackScreen/>
        </React.Fragment>
    )
};

export const throwOut = () => {
    if(store.getState().credentials.message !== ACCEPTABLE_RESPONSE_MESSAGE)
        return <Redirect to={'/'}/>
};

export const resetAnomaly = () => {
    store.dispatch({type: RESET_ANOMALY});
};
