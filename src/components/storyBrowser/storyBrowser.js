import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import GenreBox from '../genreBox/genreBox';
import PageFooter from '../../components/pageFooter/pageFooter';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import StoryParagraph from '../../components/storyParagraph/storyParagraph';
import StoryBreaks from '../storyBreaks/storyBreaks';
import './style.css';

class StoryBrowser extends Component {
    topBoxGen = () => {
        return (
            <React.Fragment>

            </React.Fragment>
        );
    };

    bottomBoxGen = () => {
        let { story } = this.props, splitStory, finalList = [];
        splitStory = story.split('*//*');

        for(let i=0; i<splitStory.length; i++) {
            if(splitStory[i] !== '') {
                finalList.push(
                    <StoryParagraph
                        text={splitStory[i]}
                        key={`StoryParagraph${i}`}
                    />
                );
            } else if (splitStory[i] === '') {
                finalList.push(
                    <StoryBreaks
                        key={`StoryBreaks${i}`}
                    />
                );
            }
        }
        return finalList;
    };

    render() {
        return (
            <div id={'o-box-search-pg'}>
                <BackgroundLoader bno={1}/>
                <TopMostBar formatType={'1'}/>
                <GreetBox/>
                <ButtonSlider
                    targetComponent={GenreBox}
                    dur={1.5}
                    def={500}
                />
                <div id={'m-box-browser-pg'} className={'shadow-4'}>
                    <div id={'t-box-browser-pg'}>{this.topBoxGen()}</div>
                    <div id={'b-box-browser-pg'}>{this.bottomBoxGen()}</div>
                </div>
                <PageFooter/>
            </div>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        story: state.fetchedStory
    }
};

export default connect(mapStateToProps)(StoryBrowser);
