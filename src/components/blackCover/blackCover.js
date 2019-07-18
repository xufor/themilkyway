import React, { Component } from 'react';

import './style.css';

class BlackCover extends Component {
    render() {
        return (
            <div id={'b-cvr'} className={'f3-ns f5'}>
                <img alt={'meme'}
                     className={'h-50 h-75-ns'}
                     src={'https://29a8hg25gdod20vz4qm6y4z7-wpengine.netdna-ssl.com/wp-content/uploads/2018/03/lazy-employee-meme.jpg'}/>
                <p>Sorry! The website doesn't support such small screens sizes because the only developer who made the whole project has moved on to another project! You can always enjoy the services on a laptop or desktop!</p>
            </div>
        );
    };
}

export default BlackCover;