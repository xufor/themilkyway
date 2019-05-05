import React from 'react';
import BlackScreen from './components/blackScreen/blackScreen';
import LoaderAnimation from './components/loaderAnimation/loaderAnimation';

export const displayLoader = (flag, message) => {
    if(flag === 1) {
        return (
            <React.Fragment>
                <LoaderAnimation message={message}/>
                <BlackScreen/>
            </React.Fragment>
        );
    } else {
        return null
    }
};

