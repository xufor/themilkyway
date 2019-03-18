import React, { Component } from 'react';
import { tags } from '../../strings';
import GenreElement from '../genreElement/genreElement';
import { tagTopicAction } from '../../actions/tagTopicAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.css';

class GenreBox extends Component {
    genreGen = () => {
        let i =0;
         return tags.map((listItem) => {
            return <GenreElement contentToBeDisplayed={listItem} key={`genreElement${i++}`}/>
        });
    };

    render() {
        return (
            <div id={'genreWrapper'} className={'shadow-4'}>
                {this.genreGen()}
            </div>
        )
    };
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ tagTopicAction }, dispatch);
};

export default connect(null, mapActionToProps)(GenreBox);

