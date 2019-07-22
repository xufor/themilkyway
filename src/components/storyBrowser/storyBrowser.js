import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import copy from 'clipboard-copy';
import { toastr } from 'react-redux-toastr';
import { Redirect } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import LoadingBar from 'react-redux-loading-bar';

import { store } from '../../index';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import GenreBox from '../genreBox/genreBox';
import PageFooter from '../../components/pageFooter/pageFooter';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import StoryParagraph from '../../components/storyParagraph/storyParagraph';
import StoryBreaks from '../storyBreaks/storyBreaks';
import { resetAnomaly, throwOut } from '../../common';
import { INVALID_REQ, INVALID_SID } from '../../reducers/anomalyReducer';
import { RESET_STORY_DATA } from '../../reducers/storyReducer';
import { fetchStory } from '../../actions/fetchStoryAction';
import { likeStory } from '../../actions/likeStoryAction';
import { unlikeStory } from '../../actions/unlikeStoryAction';
import bigLike from '../../assets/bigLike.png';
import bigTick from '../../assets/bigTick.png';
import bigShare from '../../assets/bigShare.png';
import smallLike from '../../assets/smallLike.png';
import smallEye from '../../assets/smallEye.png';
import './style.css';

const LINK_COPIED = 'You can now share this story via the link!';

class StoryBrowser extends Component {
    constructor(props) {
        super(props);
        this.like = React.createRef();
        this.islikeFresh = true;
    }

    componentWillMount() {
        // runs before rendering and componentDidMount
        throwOut(this.props.history)
    }

    onClickLike = () => {
        if(!this.props.isPending) {
            const { sid } = this.props.match.params;
            if (this.like.current.src === bigTick) {
                this.like.current.src = bigLike;
                this.props.unlikeStory(sid);
            } else {
                this.like.current.src = bigTick;
                this.props.likeStory(sid);
            }
        }
    };

    onClickShare = () => {
        let shareLink = `https://www.themilkyway.tk/shared/${this.props.match.params.sid}`;
        copy(shareLink).then(() => {
            toastr.success('Link Copied to Clipboard', LINK_COPIED);
        })
    };

    componentDidMount() {
        const { sid } = this.props.match.params;
        store.dispatch({type: RESET_STORY_DATA});
        this.props.fetchStory(sid);
    }

    componentWillUnmount() {
        store.dispatch({type: RESET_STORY_DATA});
    }

    componentDidUpdate() {
        // if the user already liked a story then set the like button to tick
        // the isLikeFresh flag alters the functionality to componentDidMount
        // thus the componentDidUpdate becomes async componentDidMount
        if(this.props.story) {
            let { already_liked } = this.props.story;
            if (already_liked && this.islikeFresh) {
                this.like.current.src = bigTick;
                this.islikeFresh = false;
            }
        }
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
                <div className={'emptySpace dn db-ns'}/>
                {
                    (story.time)?
                    <img
                        id={'l-t-b-browser-pg'}
                        alt={'like'}
                        onClick={this.onClickLike}
                        src={bigLike}
                        ref={this.like}
                        className={'grow shadow-1 dn db-l'}
                    />
                    :undefined
                }
                {
                    (story.time)?
                    <img
                        id={'x-t-b-browser-pg'}
                        alt={'share'}
                        src={bigShare}
                        className={'grow shadow-1 dn db-l'}
                        onClick={this.onClickShare}
                    />
                    :undefined
                }
            </React.Fragment>
        );
    };

    anomalyHandler = () => {
        // will redirect to homepage if server detects invalid sid or no such story
        if (this.props.anomaly === INVALID_SID || this.props.anomaly === INVALID_REQ) {
            resetAnomaly();
            return <Redirect to={'/home'}/>
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
                <BackgroundLoader bno={0}/>
                <TopMostBar formatType={'1'}/>
                <GreetBox/>
                <ButtonSlider
                    targetComponent={GenreBox}
                    dur={1.5}
                    def={500}
                />
                <div id={'m-box-browser-pg'} className={'shadow-4 w-80-m w-70-l'}>
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
        story: state.fetchedStory,
        anomaly: state.anomaly,
        isPending: state.isPending
    }
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ fetchStory, unlikeStory, likeStory }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(StoryBrowser);
