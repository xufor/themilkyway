import React from 'react';
import HeadingBar from '../headingBar/headingBar';
import BackgroundLoader from '../backgroundLoader/backgroundLoader';
import './style.css';

const NotFound = () => {
    return(
        <div id={'n-f-pg'}>
            <HeadingBar mode={'home'}/>
            <BackgroundLoader bno={1}/>
            <div>Not Found!</div>
        </div>
    );
};

export default NotFound;