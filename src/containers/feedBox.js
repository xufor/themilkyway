import React, { Component } from 'react';
import FeedView from './feedView';
import '../css/feedBox.css';
import { bindActionCreators } from 'redux';
import { updateBarState } from '../actions/barStateAction';
import { connect } from 'react-redux';

class FeedBox extends Component {
    onWheelHandler = () => {
        if(this.props.topBarState === 'expand-enabled') {
          this.props.updateBarState('shrink-enabled');
        }
    };

    viewGen = (n) => {
        let i, arr = [];
        for(i=0; i<n; i++) {
            arr[i] = <FeedView/>;
        }
        return arr;
    };

    render() {
        return (
            <div onWheel={this.onWheelHandler} id={'feedBoxWrapper'} className={'shadow-4'}>
                    {this.viewGen(5)}
            </div>
        );
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ updateBarState }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        topBarState: state.barState
    };
};

export default connect(mapStateToProps, mapActionToProps)(FeedBox);