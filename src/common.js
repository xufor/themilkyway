import React from 'react';
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

