import React from 'react';
import BackgroundLoader from '../backgroundLoader/backgroundLoader';
import './style.css';

const NotFound = () => {
    return(
        <div id={'n-f-pg'}>
            <BackgroundLoader bno={1}/>
            <div>Oops you landed on a page with no content!</div>
        </div>
    );
};

export default NotFound;