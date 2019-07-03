import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import Select from 'react-select';

import TextEditor from '../textEditor/textEditor';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import RippleButton from '../../components/rippleButton/rippleButton';
import GenreBox from '../../components/genreBox/genreBox';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import { CANNOT_BE_EMPTY } from '../loginPage/loginPage';
import { tags } from '../../strings';
import './style.css';

const TOO_MANY_GENRES = 'The number of genres cannot be greater than 3';
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
            genre: []
        }
    }

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
        let { title, summary, genre} = this.state, modifiedStory = '', genreString = '';
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
        }
        if(modifiedStory === '*/newline/*')
            toastr.info('Story has no words', STORY_CANNOT_BE_EMPTY);
        else {
            for(let i=0;i<this.state.genre.length;i++) {
                genreString += this.state.genre[i].value;
                if(!(i===this.state.genre.length-1)) {
                    genreString += ',';
                }
            }
            console.log(genreString);
        }
    };


    render() {
        return (
            <div id={'m-b-compose-pg'}>
                <BackgroundLoader bno={1}/>
                <TopMostBar formatType={'1'}/>
                <GreetBox formatType={'1'}/>
                <ButtonSlider
                    targetComponent={GenreBox}
                    dur={1.5}
                    def={500}
                />
                <div id={'e-wrap-compose-pg'} className={'shadow-4'}>
                    <div id={'t-e-compose-pg'}>
                        <div>Title:</div>
                        <input onChange={this.onTitleChange}/>
                    </div>
                    <div id={'s-e-compose-pg'}>
                        <div>Summary:</div>
                        <input onChange={this.onSummaryChange}/>
                    </div>
                    <div id={'x-e-compose-pg'}>
                        <span>Genre:</span>
                        <Select
                            isMulti
                            options={listForSelection}
                            name={'colors'}
                            className={'basic-multi-select'}
                            classNamePrefix={'select'}
                            placeholder={''}
                            onChange={this.onOptionsChange}
                        />
                    </div>
                    <TextEditor/>
                    <div id={'b-c-compose-pg'}>
                        <RippleButton
                            name={'Submit'}
                            listener={this.onClickSubmit}
                        />
                    </div>
                </div>
                <PageFooter/>
            </div>
        )
    };
}


export default ComposePage;

