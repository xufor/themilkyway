import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomePage extends Component {

    render() {
        return (
            <div className='tc mt2 f-5'>This is the homepage</div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        credentials: state.credentials
    }
};

export default connect(MapStateToProps)(HomePage);