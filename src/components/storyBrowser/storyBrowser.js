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
import bigLike from '../../assets/bigLike.png';
import bigTick from '../../assets/bigTick.png';
import bigShare from '../../assets/bigShare.png';
import smallLike from '../../assets/smallLike.png';
import smallEye from '../../assets/smallEye.png';
import './style.css';

class StoryBrowser extends Component {
    constructor(props) {
        super(props);
        this.like = React.createRef();
    }

    onClickLike = () => {
        if(this.like.current.src === bigTick)
            this.like.current.src = bigLike;
        else
            this.like.current.src = bigTick;
    };

    topBoxGen = () => {
        let { story } = this.props;
        let intro = `A story by ${story.author}`;
        return (
            <React.Fragment>
                <div id={'h-t-b-browser-pg'}>
                    <div id={'t-t-b-browser-pg'}>{story.title}</div>
                    <div id={'i-t-b-browser-pg'}>{intro}</div>
                    <div id={'s-t-b-browser-pg'}>
                        submitted on
                        <span>
                            {` ${story.date} `}
                        </span>
                        at
                        <span>
                            {` ${story.time} `}
                        </span>
                    </div>
                    <div id={'j-t-b-browser-pg'}>
                        <img
                            id={'z-t-b-browser-pg'}
                            alt={'likes'}
                            src={smallLike}
                            className={'shadow-1'}
                        />
                        {story.likes}
                        <img
                            id={'y-t-b-browser-pg'}
                            alt={'views'}
                            src={smallEye}
                            className={'shadow-1'}
                        />
                        {story.views}
                    </div>
                </div>
                <div className={'emptySpace'}/>
                <img
                    id={'l-t-b-browser-pg'}
                    alt={'like'}
                    onClick={this.onClickLike}
                    src={bigLike}
                    ref={this.like}
                    className={'grow shadow-1'}
                />
                <img
                    id={'x-t-b-browser-pg'}
                    alt={'share'}
                    src={bigShare}
                    className={'grow shadow-1'}
                />
            </React.Fragment>
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
                <BackgroundLoader bno={0}/>
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
