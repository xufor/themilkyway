import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopMostBar from './topMostBar.js';
import '../css/homePage.css';
import GreetBox from './greetBox';

class HomePage extends Component {

    render() {
        return (
          <div className='homePageBackground'>
                <TopMostBar/>
                <GreetBox/>
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