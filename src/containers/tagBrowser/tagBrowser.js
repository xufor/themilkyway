import React, { Component } from 'react';
import TopMostBar from '../topMostBar/topMostBar';
import PageFooter from '../../components/pageFooter/pageFooter';
import GenreBox from '../genreBox/genreBox';
import GreetBox from '../greetBox/greetBox';
import { connect } from 'react-redux';
import './style.css';

class TagBrowser extends Component {
    componentDidMount() {
        if(this.props.string === '') {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div id={'m-b-tag-browser'}>
                <TopMostBar formatType={'1'}/>
                <GreetBox/>
                <GenreBox/>
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