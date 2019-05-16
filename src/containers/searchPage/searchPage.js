import React, { Component } from 'react';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import SearchElement from '../searchElement/searchElement';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
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
                <BackgroundLoader/>
                <TopMostBar formatType={'1'}/>
                <GreetBox/>
                <ButtonSlider
                    targetComponent={GenreBox}
                    dur={1.5}
                    def={500}
                />
                <div id={'m-box-search-pg'} className={'shadow-4'}>
                    <div id={'t-box-search-pg'}>{topBoxGen()}</div>
                    <div id={'r-box-search-pg'}>{resultBoxGen()}</div>
                </div>
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
