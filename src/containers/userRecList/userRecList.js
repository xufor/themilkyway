import React, { Component } from 'react';
import { fetchUserRecsAction } from '../../actions/fetchUserRecsAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import goLeftImg from '../../assets/goLeft.png';
import goRightImg from '../../assets/goRight.png';
import UserRecElement from '../userRecElement/userRecElement'
import './style.css';

class UserRecList extends Component {
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
        if(links.length !== 0) {
            return links.map(() => {
                return <UserRecElement key={`userRecElement${i++}`}/>
            })
        }
    };

    render() {
        const userRecGen = this.userRecGen;
        let {wrapperRef, goLeft, goRight} = this.props;
        return (
            <React.Fragment>
                <img id={'g-l-img'} alt={'g-l'} src={goLeftImg} onClick={goLeft}/>
                    <div ref={wrapperRef} id={'userListWrapper'}>
                        {userRecGen()}
                    </div>
                <img id={'g-r-img'} alt={'g-r'} src={goRightImg} onClick={goRight}/>
            </React.Fragment>
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

export default connect(mapStateToProps, mapActionToProps)(UserRecList);