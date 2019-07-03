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
            return <GenreElement
                text={listItem}
                colorSelector={i}
                key={`genreElement${i++}`}
                byPassGen={false}
            />
        });
    };

    render() {
        const genreGen = this.genreGen;
        let {wrapperRef, goLeft, goRight} = this.props;
        return (
            <div id={'genreWrapper'} className={'shadow-4'}>
                <img id={'leftButtonGenreBox'}  onClick={goLeft} src={left} alt={'lft'}/>
                <img id={'rightButtonGenreBox'} onClick={goRight} src={right} alt={'rht'}/>
                <div id={'genreElementsWrapper'} ref={wrapperRef}>{genreGen()}</div>
            </div>
        )
    };
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ tagTopicAction }, dispatch);
};

export default connect(null, mapActionToProps)(GenreBox);

