import React, { Component } from 'react';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import FeedBox from '../feedBox/feedBox';
import PageFooter from '../../components/pageFooter/pageFooter';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import UserRecBox from '../../containers/userRecBox/userRecBox';
import GenreBox from '../../containers/genreBox/genreBox';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import './style.css';

class HomePage extends Component {
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

export default HomePage;