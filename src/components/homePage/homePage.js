import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import LoadingBar from 'react-redux-loading-bar';
import PageFooter from '../../components/pageFooter/pageFooter';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import UserRecBox from '../../components/userRecBox/userRecBox';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import FeedBox from '../feedBox/feedBox';
import GenreBox from '../../components/genreBox/genreBox';
import { throwOut } from '../../common';
import './style.css';

class HomePage extends Component {
    componentDidCatch() {
        throwOut(this.props.history)
    }

    render() {
        return (
            <React.Fragment>
                <LoadingBar
                    showFastActions
                    style={{ backgroundColor: '#448AFF', height: '4px', zIndex: 1000 }}
                />
                <div id={'m-b-home-pg'}>
                    <BackgroundLoader bno={0}/>
                    <TopMostBar
                        history={this.props.history}
                    />
                    <GreetBox/>
                    <ButtonSlider
                        targetComponent={GenreBox}
                        dur={1.5}
                        def={500}
                    />
                    <UserRecBox/>
                    <FeedBox/>
                    <PageFooter/>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(HomePage);