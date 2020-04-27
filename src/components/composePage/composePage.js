import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingBar from 'react-redux-loading-bar';
import Select from 'react-select';

import { store } from '../../index';
import TextEditor from '../textEditor/textEditor';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import RippleButton from '../../components/rippleButton/rippleButton';
import GenreBox from '../../components/genreBox/genreBox';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import { fetchStory } from '../../actions/fetchStoryAction';
import { submitStory } from '../../actions/submitStoryAction';
import { updateStory } from '../../actions/updateStoryAction';
import { throwOut } from '../../common';
import { CANNOT_BE_EMPTY } from '../loginPage/loginPage';
import { RESET_STORY_DATA } from '../../reducers/storyReducer';
import { tags } from '../../strings';
import './style.css';

export const TOO_MANY_GENRES = 'The number of genres cannot be greater than 3.';
export const ARE_YOU_SURE = 'Are you sure?';
const STORY_CANNOT_BE_EMPTY = 'You cannot submit a story with no words.';

let listForSelection = tags.map((listItem) => {
    return {value: listItem, label: listItem}
});

class ComposePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: '',
            title: '',
            story: undefined, // for editing functionality only
            genre: []
        };
        this.isDataFresh = true;
    }

    componentWillMount() {
        // runs before rendering and componentDidMount
        throwOut(this.props.history)
    }

    componentDidMount() {
        if(this.inEditMode()) {
            store.dispatch({type: RESET_STORY_DATA});
            this.props.fetchStory(this.props.match.params.sid);
        }
    }

    componentDidUpdate() {
        // the one time run on update technique
        if(this.inEditMode() && this.isDataFresh && Object.entries(this.props.story).length !== 0) {
            let { genre, story, title, summary } = this.props.story;
            // generate required array to set default value of genre
            let value = genre.split(',')
                .map((listItem) => {return {label: listItem, value: listItem}});
            // if value is not null set the state to reflect changes
            this.setState({genre: value, story, title, summary});
            // set the flag as false
            this.isDataFresh = false;
        }
    }

    inEditMode = () => {
        return !!this.props.match.params.sid;
    };

    onTitleChange = (event) => {
        this.setState({title: event.target.value})
    };

    onSummaryChange = (event) => {
        this.setState({summary: event.target.value})
    };

    onOptionsChange = (event) => {
        this.setState({genre: event})
    };

    onClickSubmit = () => {
        let { title, summary, genre } = this.state, modifiedStory = '';
        if(summary === '' || title === ''|| genre.length === 0)
            toastr.info('Cannot be empty', CANNOT_BE_EMPTY);
        else if (genre.length > 3)
            toastr.info('Too many genres', TOO_MANY_GENRES);
        else {
            let tagList = document.getElementsByClassName('ql-editor');
            for (let i = 0; i < tagList[0].children.length; i++) {
                if (tagList[0].children[i].innerHTML !== '<br>') {
                    modifiedStory += tagList[0].children[i].innerText;
                    modifiedStory += '*/para/*';
                } else
                    modifiedStory += '*/newline/*';
            }
            if(modifiedStory === '*/newline/*')
                toastr.info('Story has no words', STORY_CANNOT_BE_EMPTY);
            else {
                let genreString = '';
                for(let i=0;i<this.state.genre.length;i++) {
                    genreString += this.state.genre[i].value;
                    if(!(i===this.state.genre.length-1)) {
                        genreString += ',';
                    }
                }
                if(this.inEditMode())
                    toastr.confirm(ARE_YOU_SURE, {onOk: () => this.props.updateStory(this.props.story.sid, title, summary, modifiedStory, genreString)});
                else
                    toastr.confirm(ARE_YOU_SURE, {onOk: () => this.props.submitStory(title, summary, modifiedStory, genreString)});
            }
        }
    };

    render() {
        let { story, summary, title } = this.state;
        return (
            <div id={'m-b-compose-pg'}>
                <LoadingBar
                    showFastActions
                    style={{ backgroundColor: '#448AFF', height: '4px', zIndex: 1000 }}
                />
                <BackgroundLoader bno={0}/>
                <TopMostBar formatType={'1'}/>
                <GreetBox formatType={'1'}/>
                <ButtonSlider
                    targetComponent={GenreBox}
                    dur={1.5}
                    def={500}
                />
                <div id={'e-wrap-compose-pg'} className={'shadow-4'}>
                    <div id={'t-e-compose-pg'}>
                        <span>Title:</span>
                        <input onChange={this.onTitleChange} defaultValue={title}/>
                    </div>
                    <div id={'s-e-compose-pg'}>
                        <span>Summary:</span>
                        <input onChange={this.onSummaryChange} defaultValue={summary}/>
                    </div>
                    <div id={'x-e-compose-pg'}>
                        <span>Genre:</span>
                        <Select
                            isMulti
                            value={this.state.genre}
                            options={listForSelection}
                            name={'colors'}
                            className={'basic-multi-select'}
                            classNamePrefix={'select'}
                            placeholder={''}
                            onChange={this.onOptionsChange}
                        />
                    </div>
                    <TextEditor defaultValue={story}/>
                    <div id={'b-c-compose-pg'}>
                        <RippleButton
                            name={(this.inEditMode())?'Save Changes':'Submit'}
                            listener={this.onClickSubmit}
                        />
                    </div>
                </div>
                <PageFooter/>
            </div>
        )
    };
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ submitStory, fetchStory, updateStory }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        story: state.fetchedStory
    }
};

export default connect(mapStateToProps, mapActionToProps)(ComposePage);

