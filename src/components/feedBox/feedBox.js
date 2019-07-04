import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FeedView from '../feedView/feedView';
import RippleButton from '../rippleButton/rippleButton';
import { updateBarState } from '../../actions/barStateAction';
import { fetchUserFeed } from '../../actions/fetchUserFeedAction';
import { NO_FEED_DATA_FIRST_ATTEMPT } from "../../reducers/anomalyReducer";
import './style.css';
import './style-m.css';

class FeedBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: 1
        };
        this.btn = React.createRef();
    }

    componentDidMount() {
        this.loadFeed();
    }

    componentDidUpdate() {
        // this will remove the button when upper limit is reached
        if(this.state.version > 5)
            this.btn.current.style.display = 'none';
    }


    loadFeed = () => {
        if(!this.props.isPending && this.state.version < 6)
            this.props.fetchUserFeed(this.props.credentials.access_token, this.state.version)
                .then(() => this.setState({version: this.state.version + 1}));
    };

    onEnterHandler = () => {
        if(this.props.topBarState === 'expand-enabled') {
          this.props.updateBarState('shrink-enabled');
        }
    };

    viewGen = () => {
        // Checks for the condition when user has followed no one and has no preferences
        if(this.props.anomaly === NO_FEED_DATA_FIRST_ATTEMPT) {
            this.btn.current.style.display = 'none';
            return (
                <div id={'wse-fd-bx'}>
                    <span>Wow such empty!</span>
                    <div>Edit your preferences in the profile or follow some author to update feed.</div>
                </div>
            );
        }
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
                <span ref={this.btn}>
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
        feed: state.feed,
        isPending: state.isPending,
        anomaly: state.anomaly,
    };
};

export default connect(mapStateToProps, mapActionToProps)(FeedBox);