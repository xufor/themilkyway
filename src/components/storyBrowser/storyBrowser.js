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
        let { story } = this.props;
        let intro = `A story by ${story.author}`;
        let submitInfo = `submitted on ${story.date} at ${story.time}`;
        return (
            <div id={'h-t-b-browser-pg'}>
                <div id={'t-t-b-browser-pg'}>{story.title}</div>
                <div id={'i-t-b-browser-pg'}>{intro}</div>
                <div id={'s-t-b-browser-pg'}>{submitInfo}</div>
            </div>
        );
    };

    bottomBoxGen = () => {
        let { story } = this.props, finalList = [];
        let paragraphSplit = story.text.split('*/para/*');
        let newlineSplit = paragraphSplit.map(
            (listItem) => listItem.split('*/newline/*')
        );
        // This is the story parser loop
        for(let i=0; i<newlineSplit.length; i++) {
            for(let j=0; j<newlineSplit[i].length; j++) {
                if(newlineSplit[i][j] === '') {
                    finalList.push(
                        <StoryBreaks
                            key={`StoryBreaks${(i*17)+(19*j)}`}
                        />
                    );
                } else {
                    finalList.push(
                        <StoryParagraph
                            text={newlineSplit[i][j]}
                            key={`StoryParagraphs${(i*47)+(15*j)}`}
                        />
                    );
                }
            }
        }
        // This is the story parser loop
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
