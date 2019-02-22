import React, { Component } from 'react';
import { fetchUserRecs } from '../../actions/fetchUserRecs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.css';

class UserRecBox extends Component {
    componentDidMount() {
        this.props.fetchUserRecs();
    }

    userRecGen = () => {
        let setOfImgTags = [];
        if(this.props.links.length === 0) {
            return (
                <div className={'ball-grid-pulse'} id={'userRecBoxLoaderWrapper'}>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            )
        }
        else {
            for(let i = 0; i< this.props.links.length; i++) {
                setOfImgTags[i] = <div id={'recBoxUserImageWrapper'}><img id={'userImgInRecBox'} src={this.props.links[i]} alt={`picsOfUsers${i}`}/></div>;
            }
        }
        return setOfImgTags;
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
    return bindActionCreators({ fetchUserRecs }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(UserRecBox);