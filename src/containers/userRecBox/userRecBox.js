import React, { Component } from 'react';
import { fetchUserRecsAction } from '../../actions/fetchUserRecsAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.css';

class UserRecBox extends Component {
    constructor(props) {
        super(props);
        this.allImagesLoaded = false;
    }

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
                return <div id={'recBoxUserImageWrapper'}><img id={'userImgInRecBox'} src={listItem} alt={`picsOfUsers${i++}`}/></div>;
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

/**/