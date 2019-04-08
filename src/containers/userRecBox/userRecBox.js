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

    componentDidUpdate() {
        let k = 0, listOfInstances = [], { links } = this.props;
        let recBx = document.getElementsByClassName('userImgInRecBox');
        for(let j=0; j<links.length; j++) {
            listOfInstances[j] = new Image();
        }
        listOfInstances.map((listItem) => {
            listItem.onload = function() {
                recBx[k].src = this.src;
                recBx[k].style.display = 'block';
                k++;
            };
            return listItem;
        });
        for(let j=0; j<links.length; j++) {
            listOfInstances[j].src = links[j];
        }
    }

    userRecGen = () => {
        let i = 0;
        let { links } = this.props;
        if(links.length === 0) {
            return (
                <div className={'line-scale'} id={'userRecBoxLoaderWrapper'}>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            )
        }
        else {
            return links.map(() => {
                return <UserRecElement key={`userRecElement${i++}`}/>
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

