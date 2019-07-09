import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { store } from '../../index';
import TopMostBar from '../topMostBar/topMostBar';
import PageFooter from '../../components/pageFooter/pageFooter';
import StoryElement from '../../components/storyElement/storyElement';
import RippleButton from '../../components/rippleButton/rippleButton';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import GenreBox from '../genreBox/genreBox';
import GreetBox from '../greetBox/greetBox';
import { RESET_GENRE_DATA } from '../../reducers/genreReducer';
import { NO_GENRE_DATA_FIRST_ATTEMPT } from '../../reducers/anomalyReducer';
import { fetchGenreData } from '../../actions/fetchGenreDataAction';
import { throwOut, resetAnomaly } from '../../common';
import { tags } from '../../strings';
import './style.css';

class TagBrowser extends Component {
    constructor(props) {
        super(props);
        this.version = 1;
        this.state = {
            refresh: 1
        }
    }

    componentDidMount() {
        // send to homepage if genre is not valid
        const { genre } = this.props.match.params;
        if(_.indexOf(tags, genre) === -1)
            this.props.history.push('/home');
        // load the genre data
        this.loadGenreData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.genre !== this.props.match.params.genre) {
            // anomaly needs to be reset
            resetAnomaly();
            // reset the version
            this.version = 1;
            // reset genre data
            store.dispatch({type: RESET_GENRE_DATA});
            // load new data
            this.loadGenreData()
        }
    }

    componentWillUnmount() {
        // anomaly needs to be reset
        resetAnomaly();
    }

    loadGenreData = () => {
        if(!this.props.isPending) {
            const { genre } = this.props.match.params;
            if (this.version <= 10) {
                this.props.fetchGenreData(this.version, genre)
                    .then(() => this.version++);
            }
        }
    };

    topBoxGen = () => {
        return (
            <div id={'stat-tag-browser'}>
                {`Recent posts in: "${this.props.match.params.genre}"`}
            </div>
        );
    };

    resultBoxGen = () => {
        // if anomaly occurs
        let { anomaly } = this.props;
        if(anomaly === NO_GENRE_DATA_FIRST_ATTEMPT) {
            return (
                <React.Fragment>
                    <div id={'nsy-gnr-bx'} className={'shadow-5'}>
                        No stories under this genre yet!
                    </div>
                </React.Fragment>
            );
        }
        // if no anomaly occurs
        let i = 0, { results } = this.props.genre;
        if(results)
            return (
                results.map((listItem) => {
                    return <StoryElement
                        name={listItem}
                        key={`storyElement${i++}`}
                        mode={'no-buttons'}
                        data={listItem}
                    />
                })
            );
        else {
            let x = [];
            for(i=0; i<10; i++) {
                x[i] = <StoryElement key={`storyElement${i}`}/>;
            }
            return x;
        }
    };

    render() {
        const topBoxGen = this.topBoxGen;
        const resultBoxGen = this.resultBoxGen;
        return (
            <div id={'m-b-tag-browser'}>
                {throwOut()}
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
                    <span>
                        <RippleButton
                            name={'Load more results'}
                            listener={this.loadGenreData}
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
        string: state.isPending,
        genre: state.genre,
        anomaly: state.anomaly
    }
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ fetchGenreData }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(TagBrowser);