import React, { Component } from 'react';

import './style.css';

class BlackCover extends Component {
    render() {
        return (
            <div id={'b-cvr'} className={'f3-ns f5'}>
                <img alt={'meme'}
                     className={'h-50 h-75-ns'}
                     src={'https://antitrustlair.files.wordpress.com/2012/09/work-in-progress.png'}/>
                <p>Sorry! The website doesn't support such small screens sizes because it hasn't been optimized for small screens yet! You can always enjoy the services on a laptop or desktop!</p>
            </div>
        );
    };
}

export default BlackCover;