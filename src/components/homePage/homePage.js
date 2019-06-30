import React, { Component } from 'react';

import PageFooter from '../../components/pageFooter/pageFooter';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import UserRecBox from '../../components/userRecBox/userRecBox';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import FeedBox from '../feedBox/feedBox';
import GenreBox from '../../components/genreBox/genreBox';
import { isNotLoggedIn } from '../../common';
import './style.css';

class HomePage extends Component {
    componentDidMount() {
        // user is not logged in or tokes are revoked then send to login
        // if the tokens are revoked the reloads will take care of sending to login
        if(isNotLoggedIn())
            this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <div id={'homePageBackground'}>
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
            </div>
        )
    }
}

export default (HomePage);