import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FeedView from '../feedView/feedView';
import { updateBarState } from '../../actions/barStateAction';
import { fetchUserFeed } from '../../actions/fetchUserFeedAction';
import './style.css';
import './style-m.css';

class FeedBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
          version: 2
        };
    }

    componentDidMount() {
        let { access_token } = this.props.credentials;
        this.props.fetchUserFeed(access_token, this.state.version);
    }

    onEnterHandler = () => {
        if(this.props.topBarState === 'expand-enabled') {
          this.props.updateBarState('shrink-enabled');
        }
    };

    viewGen = () => {
        let i=0, arr = [];
        if(!this.props.feed.results) { // will go to else if this expression is not undefined
            for(i=0; i<15; i++) {
                arr[i] = <FeedView key={`feedView${i}`}/>;
            }
            return arr;
        } else {
            return this.props.feed.results.map((listItem) => {
                i++;
                return <FeedView
                    key={`feedView${i}`}
                    data={listItem}
                />
            });
        }
    };

    render() {
        return (
            <div
                onMouseEnter={this.onEnterHandler}
                id={'feedBoxWrapper'}
                className={'shadow-4'}
            > {this.viewGen()}
            </div>
        );
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ updateBarState, fetchUserFeed }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        topBarState: state.barState,
        credentials: state.credentials,
        feed: state.feed
    };
};

export default connect(mapStateToProps, mapActionToProps)(FeedBox);