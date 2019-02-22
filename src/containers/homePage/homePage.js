import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import FeedBox from '../feedBox/feedBox';
import PageFooter from '../../components/pageFooter/pageFooter';
import BlackScreen from '../../components/blackScreen/blackScreen';
import LoaderAnimation from '../../components/loaderAnimation/loaderAnimation';
import UserRecBox from '../../containers/userRecBox/userRecBox';
import './style.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loaderFlag: 0,
        };
    }

    displayLoader = (flag) => {
        if(flag === 1) {
            return (
                <div>
                    <LoaderAnimation/>
                    <BlackScreen/>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                {this.displayLoader(this.state.loaderFlag)}
                <div id={'homePageBackground'}>
                    <TopMostBar history={this.props.history} calledFrom={'homePage'}/>
                    <GreetBox/>
                    <UserRecBox/>
                    <FeedBox/>
                    <PageFooter/>
                </div>
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        credentials: state.credentials
    }
};

export default connect(MapStateToProps)(HomePage);