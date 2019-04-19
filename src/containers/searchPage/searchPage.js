import React, { Component } from 'react';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import SearchElement from '../searchElement/searchElement';
import GenreBox from '../genreBox/genreBox';
import { names } from '../../strings';
import { connect } from 'react-redux';
import './style.css';

class SearchPage extends Component {
    componentDidMount() {
        if(this.props.string === '') {
            this.props.history.push('/')
        }
    }

    topBoxGen = () => {
        let { string } = this.props, statement;
        statement = `Showing results for: "${string}"`;
        return (
            <div id={'stat-search-pg'}>{`${statement}`}</div>
        );
    };

    resultBoxGen = () => {
        let i = 0;
        return (
            names.map((listItem) => {
                return <SearchElement name={listItem} key={`searchElement${i++}`}/>
            })
        );
    };

    render() {
        const topBoxGen = this.topBoxGen;
        const resultBoxGen = this.resultBoxGen;
        return (
            <div id={'o-box-search-pg'}>
                <TopMostBar formatType={'1'}/>
                <GreetBox/>
                <GenreBox/>
                <div id={'t-box-search-pg'}>{topBoxGen()}</div>
                <div id={'r-box-search-pg'}>{resultBoxGen()}</div>
                <PageFooter/>
            </div>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        string: state.searchString.data
    }
};

export default connect(mapStateToProps)(SearchPage);