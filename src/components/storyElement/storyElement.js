import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import {  bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { ARE_YOU_SURE } from '../composePage/composePage';
import { deleteStory } from '../../actions/deleteStoryAction';
import RippleButton from '../rippleButton/rippleButton';
import './style.css';

class StoryElement extends Component {
    onClickEdit = () => {
        let { data } = this.props;
        toastr.confirm(ARE_YOU_SURE, {onOk: () => {
            this.props.history.push(`/edit/${data.sid}`);
        }});
    };

    onClickDelete = () => {
        let { data } = this.props;
        toastr.confirm(ARE_YOU_SURE, {onOk: () => this.props.deleteStory(data.sid)});
    };

    deleteAndEditButtonsGen = () => {
        let { mode } = this.props;
        if(mode === 'with-buttons') {
            return (
                <React.Fragment>
                    <RippleButton
                        name={'Edit'}
                        listener={this.onClickEdit}
                    />
                    <RippleButton
                        name={'Delete'}
                        listener={this.onClickDelete}
                    />
                </React.Fragment>
            );
        } else if(mode === 'no-buttons') {
            return undefined;
        }
    };

    render() {
        let { data } = this.props;
        return (
            <div id={'m-b-st-element'} className={'shadow-4'}>
                {
                    (data)?
                    <div
                        className={'t-st-element'}>
                        <Link to={`/story/${data.sid}`}>
                            {data.title}
                        </Link>
                    </div>
                    : <div className={'t-st-element'}><Skeleton height={20}/></div>
                }
                {   (data)?
                    <div className={'n-st-element'}>{`by `}
                        <Link to={`/profile/${data.uid}`}>{data.name}</Link>
                    </div>
                    : <div className={'t-st-element'}><Skeleton height={20}/></div>
                }
                {   (data)?
                    <p className={'sm-st-element'}>{data.summary}</p>
                    : <p className={'sm-st-element'}><Skeleton height={50}/></p>
                }
                {this.deleteAndEditButtonsGen()}
            </div>
        );
    };
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ deleteStory }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials,
        profile: state.profile
    }
};

export default connect(mapStateToProps, mapActionToProps)(withRouter(StoryElement));