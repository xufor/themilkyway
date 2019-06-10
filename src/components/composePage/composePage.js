import React, { Component } from 'react';
import TextEditor from '../textEditor/textEditor';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import RippleButton from '../../components/rippleButton/rippleButton';
import GenreBox from '../../components/genreBox/genreBox';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import './style.css';

class ComposePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: '',
            title: ''
        }
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value})
    };

    onSummaryChange = (event) => {
        this.setState({summary: event.target.value})
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
                    <TextEditor/>
                    <div id={'b-c-compose-pg'}>
                        <RippleButton name={'Submit'}/>
                    </div>
                </div>
                <PageFooter/>
            </div>
        )
    };
}


export default ComposePage;

