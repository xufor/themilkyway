import React, { Component } from 'react';
import UserRecElement from '../userRecElement/userRecElement'
import { fetchUserRecsAction } from '../../actions/fetchUserRecsAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.css';

class UserRecBox extends Component {
    componentDidMount() {
        this.props.fetchUserRecs();
    }

    userRecGen = () => {
        let i = 0;
        if(this.props.links.length === 0) {
            return (
                <div className={'line-scale-pulse-out-rapid'} id={'userRecBoxLoaderWrapper'}>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            )
        }
        else {
            return this.props.links.map((listItem) => {
                return <UserRecElement linkPassedToChildElement={listItem} key={`userRecElement${i++}`}/>
            })
        }
    };

    render() {
        return (
            <div id={'recBoxWrapper'} className={'shadow-4'}>
                {this.userRecGen()}
            </div>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        links: state.userRecLinks
    }
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ fetchUserRecs: fetchUserRecsAction }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(UserRecBox);

