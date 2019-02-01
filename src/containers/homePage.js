import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopMostBar from './topMostBar.js';
import GreetBox from './greetBox.js';
import FeedBox from './feedBox.js';
import '../css/homePage.css';

class HomePage extends Component {
    render() {
        return (
          <div className='homePageBackground'>
                <TopMostBar history={this.props.history}/>
                <GreetBox/>
                <FeedBox/>
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