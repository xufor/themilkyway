import React, { Component } from 'react';
import { tags } from '../../strings';
import GenreElement from '../genreElement/genreElement';
import { tagTopicAction } from '../../actions/tagTopicAction';
import { bindActionCreators } from 'redux';
import left from '../../assets/left.png';
import right from '../../assets/right.png';
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
                <img id={'leftButtonGenreBox'} src={left} alt={'lft'}/>
                <img id={'rightButtonGenreBox'} src={right} alt={'rht'}/>
                {this.genreGen()}
            </div>
        )
    };
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ tagTopicAction }, dispatch);
};

export default connect(null, mapActionToProps)(GenreBox);

