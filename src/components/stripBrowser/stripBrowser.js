import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import LoadingBar from 'react-redux-loading-bar';

import { store } from '../../index';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import StoryParagraph from '../../components/storyParagraph/storyParagraph';
import StoryBreaks from '../storyBreaks/storyBreaks';
import HeadingBar from '../headingBar/headingBar';
import { resetAnomaly } from '../../common';
import { INVALID_REQ, INVALID_SID } from '../../reducers/anomalyReducer';
import { RESET_STORY_DATA } from '../../reducers/storyReducer';
import { fetchStory } from '../../actions/fetchStoryAction';
import smallLike from '../../assets/smallLike.png';
import smallEye from '../../assets/smallEye.png';

class StripBrowser extends Component {
    componentDidMount() {
        const { sid } = this.props.match.params;
        store.dispatch({type: RESET_STORY_DATA});
        this.props.fetchStory(sid);
    }

    componentWillUnmount() {
        store.dispatch({type: RESET_STORY_DATA});
    }

    topBoxGen = () => {
        let { story } = this.props;
        return (
            <React.Fragment>
                <div id={'h-t-b-browser-pg'}>
                    <div id={'t-t-b-browser-pg'}>
                        {
                            (story.title)
                                ?story.title
                                :<Skeleton height={30} width={500}/>
                        }
                    </div>
                    <div id={'i-t-b-browser-pg'}>
                        {
                            (story.name)
                                ?`A story by ${story.name}`
                                :<Skeleton height={30} width={500}/>
                        }
                    </div>

                    {
                        (story.time)?
                            <div id={'s-t-b-browser-pg'}>
                                submitted on
                                <span>
                                    {` ${story.time.split('T')[0]} `}
                                </span>
                                at
                                <span>
                                    {` ${story.time.split('T')[1].split('+')[0]} `}
                                </span>
                            </div>
                            :<Skeleton height={20} width={500}/>
                    }
                    {
                        (story.time)?
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
                            :<Skeleton height={20} width={500}/>
                    }
                </div>
            </React.Fragment>
        );
    };

    anomalyHandler = () => {
        // will redirect to homepage if server detects invalid sid or no such story
        if (this.props.anomaly === INVALID_SID || this.props.anomaly === INVALID_REQ) {
            resetAnomaly();
            return <Redirect to={'/'}/>
        }
    };

    bottomBoxGen = () => {
        let { story } = this.props, finalList = [];
        if(story.story) {
            let paragraphSplit = story.story.split('*/para/*');
            let newlineSplit = paragraphSplit.map(
                (listItem) => listItem.split('*/newline/*')
            );
            // This is the story parser loop
            for (let i = 0; i < newlineSplit.length; i++) {
                for (let j = 0; j < newlineSplit[i].length; j++) {
                    if (newlineSplit[i][j] === '') {
                        finalList.push(
                            <StoryBreaks
                                key={`StoryBreaks${(i * 17) + (19 * j)}`}
                            />
                        );
                    } else {
                        finalList.push(
                            <StoryParagraph
                                text={newlineSplit[i][j]}
                                key={`StoryParagraphs${(i * 47) + (15 * j)}`}
                            />
                        );
                    }
                }
            }
            return finalList;
        } else return <Skeleton count={50}/>
    };

    render() {
        return (
            <div id={'o-box-search-pg'}>
                {this.anomalyHandler()}
                <LoadingBar
                    showFastActions
                    style={{ backgroundColor: '#448AFF', height: '4px', zIndex: 1000 }}
                />
                <BackgroundLoader bno={1}/>
                <HeadingBar mode={'register'}/>
                <div id={'m-box-browser-pg'} className={'shadow-4 w-80-m w-70-l'}>
                    <div id={'t-box-browser-pg'}>{this.topBoxGen()}</div>
                    <div id={'b-box-browser-pg'}>{this.bottomBoxGen()}</div>
                </div>
            </div>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        story: state.fetchedStory,
        anomaly: state.anomaly,
    }
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ fetchStory }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(StripBrowser);
