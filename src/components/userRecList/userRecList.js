import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserRecs } from '../../actions/fetchUserRecsAction';

import UserRecElement from '../userRecElement/userRecElement';
import goLeftImg from '../../assets/goLeft.png';
import goRightImg from '../../assets/goRight.png';
import './style.css';

class UserRecList extends Component {
    componentDidMount() {
        // if tokens are expired the page reloads will take care of mounting again
        this.props.fetchUserRecs();
    }

    userRecGen = () => {
        let i = 0, { info } = this.props;
        if(Object.values(info).length !== 0) {
            let { users } = info;
            return users.map((listItem) => {
                return <UserRecElement
                    key={`userRecElement${i++}`}
                    data={listItem}
                />
            })
        } else {
            let x = [];
            for(i=0; i<=20; i++) {
                x[i] = <UserRecElement
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
        info: state.userRecInfo,
    }
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ fetchUserRecs }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(UserRecList);