import React, { Component } from 'react';
import { connect } from 'react-redux';
import GreetBox from './greetBox';

class HomePage extends Component {

    render() {
        return (
            <div>
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