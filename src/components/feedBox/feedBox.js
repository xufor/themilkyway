import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import FeedView from '../feedView/feedView';
import RippleButton from '../rippleButton/rippleButton';
import { updateBarState } from '../../actions/barStateAction';
import { fetchUserFeed } from '../../actions/fetchUserFeedAction';
import './style.css';
import './style-m.css';

const NO_MORE_FEEDS = 'This is all for now.Please try again later!';

class FeedBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
          version: 1
        };
    }

    componentDidMount() {
        this.loadFeed()
    }

    loadFeed = () => {
        if(this.state.version !== 5) {
            let currentVersion = this.props.feed;
            let {access_token} = this.props.credentials;
            this.props.fetchUserFeed(access_token, this.state.version)
                .then(() => {
                    if(_.isEqual(currentVersion, this.props.feed)) {
                        this.setState({version: 5});
                        toastr.success('No more stories', NO_MORE_FEEDS);
                        return;
                    }
                    this.setState({version: this.state.version + 1})
                });
        } else {
            toastr.success('No more stories', NO_MORE_FEEDS);
        }
    };

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
            <div onMouseEnter={this.onEnterHandler} id={'f-bx-wrapper'} className={'shadow-4'}>
                {this.viewGen()}
                <span>
                    <RippleButton
                        name={'Load More Results'}
                        listener={this.loadFeed}
                    />
                </span>
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