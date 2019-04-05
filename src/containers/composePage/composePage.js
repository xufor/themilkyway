import React, { Component } from 'react';
import TextEditor from '../textEditor/textEditor';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import RippleButton from '../../components/rippleButton/rippleButton';
import UserRecBox from '../../containers/userRecBox/userRecBox';
import GenreBox from '../../containers/genreBox/genreBox';
import './style.css';

class ComposePage extends Component {
    render() {
        return (
            <div id={'m-b-compose-pg'}>
                <TopMostBar calledFrom={'composePage'}/>
                <GreetBox calledFrom={'composePage'}/>
                <GenreBox/>
                <UserRecBox/>
                <div id={'e-wrap-compose-pg'} className={'shadow-4'}>
                    <div id={'t-e-compose-pg'}>
                        <div>Title:</div>
                        <input/>
                    </div>
                    <div id={'s-e-compose-pg'}>
                        <div>Summary:</div>
                        <input/>
                    </div>
                    <TextEditor/>
                    <div id={'b-c-compose-pg'}>
                        <RippleButton name={'Save Draft'}/>
                        <RippleButton name={'Submit'}/>
                    </div>
                </div>
                <PageFooter/>
            </div>
        )
    };
}


export default ComposePage;

