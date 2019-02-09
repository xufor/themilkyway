import React from 'react';
import BlackScreen from './components/blackScreen';
import LoaderAnimation from './components/loaderAnimation';

export const displayLoader = (flag, messageToAnimation) => {
    if(flag === 1) {
        return (
            <div>
                <LoaderAnimation message={messageToAnimation}/>
                <BlackScreen/>
            </div>
        );
    }
};