import React, { Component } from 'react';
import TopMostBar from '../topMostBar/topMostBar';
import PageFooter from '../../components/pageFooter/pageFooter';
import StoryElement from '../../components/storyElement/storyElement';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import GenreBox from '../genreBox/genreBox';
import GreetBox from '../greetBox/greetBox';
import { summary } from '../../strings';
import { connect } from 'react-redux';
import { names } from '../../strings';
import './style.css';

class TagBrowser extends Component {
    componentDidMount() {
        if(this.props.string === '') {
            this.props.history.push('/')
        }
    }

    topBoxGen = () => {
        let { string } = this.props, statement;
        statement = `Recent posts in: "${string}"`;
        return (
            <div id={'stat-tag-browser'}>{`${statement}`}</div>
        );
    };

    resultBoxGen = () => {
        let i = 0;
        return (
            names.map((listItem) => {
                return <StoryElement
                    name={listItem}
                    title={'The Last Leaf'}
                    summary={summary}
                    key={`searchElement${i++}`}
                />
            })
        );
    };

    render() {
        const topBoxGen = this.topBoxGen;
        const resultBoxGen = this.resultBoxGen;
        return (
            <div id={'m-b-tag-browser'}>
                <BackgroundLoader bno={1}/>
                <TopMostBar formatType={'1'}/>
                <GreetBox/>
                <ButtonSlider
                    targetComponent={GenreBox}
                    dur={1.5}
                    def={500}
                />
                <div id={'c-w-tag-browser'} className={'shadow-4'}>
                    <div id={'t-b-tag-browser'}>{topBoxGen()}</div>
                    <div id={'r-b-tag-browser'}>{resultBoxGen()}</div>
                </div>
                <PageFooter/>
            </div>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        string: state.tagTopic
    }
};

export default connect(mapStateToProps)(TagBrowser);