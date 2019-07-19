import React, { Component } from 'react';
import { connect } from 'react-redux';
import Switch from 'react-switch';
import { bindActionCreators } from 'redux';

import { store } from '../../index';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import GenreBox from '../genreBox/genreBox';
import StoryElement from '../storyElement/storyElement';
import PageFooter from '../../components/pageFooter/pageFooter';
import SearchElement from '../searchElement/searchElement';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import RippleButton from '../rippleButton/rippleButton';
import { fetchSearchData } from '../../actions/fetchSearchDataAction';
import { RESET_SEARCH_CONTENT } from '../../reducers/searchReducer';
import { NO_SEARCH_DATA_FIRST_ATTEMPT } from '../../reducers/anomalyReducer';
import { resetAnomaly, throwOut } from '../../common';
import './style.css';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
        this.btn = React.createRef();
        this.content = 'authors';
        this.version = 1
    }

    componentWillMount() {
        // runs before rendering and componentDidMount
        throwOut(this.props.history)
    }

    componentDidMount() {
        const string = this.props.match.params.query;
        if(string.length < 5 || string.length > 100)
            this.props.history.push('/home');
        this.loadSearchData('authors');
    }

    componentWillUnmount() {
        // safe place to reset anomaly
        resetAnomaly();
    }

    loadSearchData = () => {
        const string = this.props.match.params.query;
        if(!this.props.isPending && this.version <= 10)
            this.props.fetchSearchData(this.version, this.content, string)
                .then(() => this.version++);
    };

    handleSwitchChange = (checked) => {
        // search needs to be reset too
        store.dispatch({ type: RESET_SEARCH_CONTENT });
        // anomaly reset is also necessary as content is changing
        resetAnomaly();
        // set version back to 1
        this.version = 1;
        // change the content type
        if(checked)
            this.content = 'stories';
        else
            this.content = 'authors';
        // load search data again
        this.loadSearchData(this.content);
        // do the changes requested by React Switch
        this.setState({ checked });
    };

    topBoxGen = () => {
        let statement = `Showing results for: "${this.props.match.params.query}"`;
        return (
            <React.Fragment>
                <div id={'stat-search-pg'}>{`${statement}`}</div>
                <div className={'emptySpace'}/>
                <Switch
                    onChange={this.handleSwitchChange}
                    checked={this.state.checked}
                    className={'react-switch'}
                    onColor={'#424242'}
                    offColor={'#424242'}
                    offHandleColor={'#FFFFFF'}
                    onHandleColor={'#FFFFFF'}
                    width={100}
                    uncheckedIcon={
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                fontSize: 15,
                                color: 'white',
                                marginRight: '35px'
                            }}
                        >
                            Authors
                        </div>
                    }
                    checkedIcon={
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                fontSize: 15,
                                color: 'white',
                                marginLeft: '35px'
                            }}
                        >
                            Stories
                        </div>
                    }
                />
            </React.Fragment>
        );
    };

    resultBoxGen = () => {
        if(this.props.anomaly === NO_SEARCH_DATA_FIRST_ATTEMPT) {
            return (
                <div id={'nrf-se-pg'} className={'shadow-5'}>
                    <div>No results found. Try searching something else.</div>
                </div>
            );
        }
        let i = 0, { results } = this.props.search;
        if(results)
            if(this.content === 'authors')
                return (
                    results.map((listItem) => {
                        return <SearchElement
                            data={listItem}
                            key={`searchElement${i++}`}
                        />
                    })
                );
            else
                return (
                    results.map((listItem) => {
                        return <StoryElement
                            data={listItem}
                            key={`storyElement${i++}`}
                            mode={'no-buttons'}
                        />
                    })
                );
        else {
            let x = [];
            if(this.content === 'authors')
                for(i=0; i<10; i++) {
                     x[i] = <SearchElement key={`searchElement${i}`}/>
                }
            else
                for(i=0; i<10; i++) {
                    x[i] = <StoryElement key={`storyElement${i}`}/>
                }
            return x;
        }
    };

    render() {
        const topBoxGen = this.topBoxGen;
        const resultBoxGen = this.resultBoxGen;
        return (
            <div id={'o-box-search-pg'}>
                <BackgroundLoader bno={0}/>
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
                    <span ref={this.btn}>
                        <RippleButton
                            name={'Load more results'}
                            listener={this.loadSearchData}
                        />
                    </span>
                </div>
                <PageFooter/>
            </div>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        anomaly: state.anomaly,
        search: state.searchData,
        isPending: state.isPending
    }
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ fetchSearchData }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(SearchPage);
