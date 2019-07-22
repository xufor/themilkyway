import React, { Component } from 'react';
import { tags } from '../../strings';
import GenreElement from '../genreElement/genreElement';

import left from '../../assets/left.png';
import right from '../../assets/right.png';
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
            <div id={'genreWrapper'} className={'shadow-4 dn db-ns'}>
                <img id={'leftButtonGenreBox'}  onClick={goLeft} src={left} alt={'lft'}/>
                <img id={'rightButtonGenreBox'} onClick={goRight} src={right} alt={'rht'}/>
                <div id={'genreElementsWrapper'} ref={wrapperRef}>{genreGen()}</div>
            </div>
        )
    };
}

export default GenreBox;

