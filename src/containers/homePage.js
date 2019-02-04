import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopMostBar from './topMostBar';
import GreetBox from './greetBox';
import FeedBox from './feedBox';
import PageFooter from '../components/pageFooter';
import '../css/homePage.css';

class HomePage extends Component {
    render() {
        return (
          <div id={'homePageBackground'}>
                <TopMostBar history={this.props.history}/>
                <GreetBox/>
                <FeedBox/>
                <PageFooter/>
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