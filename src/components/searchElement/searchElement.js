import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { followTarget } from '../../actions/followAction';
import { unfollowTarget } from '../../actions/unfollowAction';
import { retImg } from '../../common';
import RippleButton from '../../components/rippleButton/rippleButton';
import './style.css';

class SearchElement extends Component {
    constructor(props) {
        super(props);
        this.btn = React.createRef();
    }

    onClick = () => {
        const { isPending } = this.props;
        if(!isPending) {
            const {uid} = this.props.data;
            const {innerText} = this.btn.current;
            if (innerText === 'Unfollow') {
                this.btn.current.innerText = 'Follow';
                this.props.unfollowTarget(uid);
            } else {
                this.btn.current.innerText = 'Unfollow';
                this.props.followTarget(uid);
            }
        }
    };

    buttonRenderer = () => {
        let { already_following } = this.props.data, dilemma = this.props;
        if(dilemma)
            return null;
        else
            return (
                <div className={'f-button-s-element'}>
                    <RippleButton
                        name={(already_following) ? ('Unfollow') : ('Follow')}
                        listener={this.onClick}
                        cRef={this.btn}
                    />
                </div>
            );
    };

    render() {
        let { data } = this.props;
        return (
            <div id={'s-element-wrapper'} className={'shadow-4'}>
                <div className={'n-i-s-element-wrapper'}>
                    {
                        (data)?
                        <img
                            className={'i-s-element'}
                            src={retImg(data.image,150,150)}
                            alt={'s-d-img'}
                        />: <Skeleton circle={true} height={100} width={100}/>
                    }
                    {
                        (data)?
                        <div className={'n-s-element'}>
                            <Link to={`/profile/${data.uid}`} onClick={this.switchProfile}>
                                {data.name}
                            </Link>
                        </div> :
                            <span className={'n-s-element'}>
                                <Skeleton count={1} height={20} width={300}/>
                            </span>
                    }
                    <div className={'emptySpace'}/>
                    {
                        (data)?
                            this.buttonRenderer()
                            :undefined
                    }
                    </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isPending: state.isPending
    }
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ unfollowTarget, followTarget }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(SearchElement);

