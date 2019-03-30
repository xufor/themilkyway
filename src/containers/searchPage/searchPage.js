import React, { Component } from 'react';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import SearchElement from '../searchElement/searchElement';
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
        return (
            <div id={'o-box-search-pg'}>
                <TopMostBar calledFrom={'profilePage'}/>
                <GreetBox/>
                <div id={'t-box-search-pg'}>{this.topBoxGen()}</div>
                <div id={'r-box-search-pg'}>{this.resultBoxGen()}</div>
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