import React, { Component } from 'react';
import FeedView from './feedView';
import '../css/feedBox.css';

class FeedBox extends Component {

    viewGen = (n) => {
        let i, arr = [];
        for(i=0; i<n; i++) {
            arr[i] = <FeedView/>;
        }
        return arr;
    };

    render() {
        return (
            <div id={'boxWrapper'} className={'shadow-4'}>
                    {this.viewGen(5)}
            </div>
        );
    }
}

export default FeedBox;