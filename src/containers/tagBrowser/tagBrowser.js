import React, { Component } from 'react';
import TopMostBar from '../topMostBar/topMostBar';
import PageFooter from '../../components/pageFooter/pageFooter';
import StoryElement from '../../containers/storyElement/storyElement';
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
                return <StoryElement name={listItem} title={'The Last Leaf'} summary={summary} key={`searchElement${i++}`}/>
            })
        );
    };

    render() {
        return (
            <div id={'m-b-tag-browser'}>
                <TopMostBar formatType={'1'}/>
                <GreetBox/>
                <GenreBox/>
                <div id={'c-w-tag-browser'}>
                    <div id={'t-b-tag-browser'}>{this.topBoxGen()}</div>
                    <div id={'r-b-tag-browser'}>{this.resultBoxGen()}</div>
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