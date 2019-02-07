import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopMostBar from './topMostBar';
import GreetBox from './greetBox';
import FeedBox from './feedBox';
import PageFooter from '../components/pageFooter';
import BlackScreen from '../components/blackScreen';
import LoaderAnimation from '../components/loaderAnimation';
import '../css/homePage.css';

// https://connoratherton.com/loaders

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
                    <TopMostBar history={this.props.history}/>
                    <GreetBox/>
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