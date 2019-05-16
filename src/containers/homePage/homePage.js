import React, { Component } from 'react';
import { connect } from 'react-redux';
import { displayLoader } from '../../common';
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
    constructor(props) {
        super(props);
        this.state = {
          loaderFlag: 0,
        };
    }

    render() {
        const { loaderFlag } = this.state;
        return (
            <div>
                {displayLoader(loaderFlag)}
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

const MapStateToProps = (state) => {
    return {
        credentials: state.credentials
    }
};

export default connect(MapStateToProps)(HomePage);