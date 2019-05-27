import React, { Component } from 'react';
import { fetchUserRecsAction } from '../../actions/fetchUserRecsAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import goLeftImg from '../../assets/goLeft.png';
import goRightImg from '../../assets/goRight.png';
import UserRecElement from '../userRecElement/userRecElement';
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
                recBx[k].style.animation = 'fadeEntry 0.5s ease-in-out alternate 1 backwards running';
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
        console.log(links.length);
        if(links.length !== 0) {
            return links.map(() => {
                return <UserRecElement
                    mode={'links-arrived'}
                    key={`userRecElement${i++}`}
                />
            })
        } else {
            let x = [];
            for(i=0; i<=20; i++) {
                x[i] = <UserRecElement
                    mode={'links-not-arrived'}
                    key={`sk-ldg-urb${i}`}
                />;
            }
            return x;
        }
    };

    render() {
        const userRecGen = this.userRecGen;
        let {wrapperRef, goLeft, goRight, updateStats} = this.props;
        return (
            <React.Fragment>
                <img
                    id={'g-l-img'}
                    alt={'g-l'}
                    src={goLeftImg}
                    onClick={goLeft}
                    onMouseEnter={updateStats}
                />
                    <div ref={wrapperRef} id={'userListWrapper'}>
                        {userRecGen()}
                    </div>
                <img
                    id={'g-r-img'}
                    alt={'g-r'}
                    src={goRightImg}
                    onClick={goRight}
                    onMouseEnter={updateStats}
                />
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