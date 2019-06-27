import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FeedView from '../feedView/feedView';
import { updateBarState } from '../../actions/barStateAction';
import './style.css';
import './style-m.css';

class FeedBox extends Component {
    handler = () => {
        if(this.props.topBarState === 'expand-enabled') {
          this.props.updateBarState('shrink-enabled');
        }
    };

    viewGen = (n) => {
        let i, arr = [];
        for(i=0; i<n; i++) {
            arr[i] = <FeedView key={`feedView${i}`}/>;
        }
        return arr;
    };

    render() {
        const viewGen = this.viewGen;
        return (
            <div onMouseEnter={this.handler} id={'feedBoxWrapper'} className={'shadow-4'}>
                    {viewGen(5)}
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