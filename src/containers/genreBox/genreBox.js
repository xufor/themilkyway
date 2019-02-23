import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { tags } from '../../strings';
import { colorGen } from '../../common';
import './style.css';

class genreBox extends Component {
    genreGen = () => {
        let listOfTags = [];
        for(let i = 0; i<= tags.length; i++) {
            listOfTags[i] =
                <Link to={`/tagView=${tags[i]}`} id={'linksInGenreBox'}>
                    <div
                        style={{backgroundColor: `${colorGen()}`}}
                        className={'genreBoxElement'}>
                        {tags[i]}
                    </div>
                </Link>;
        }
        return listOfTags;
    };

    render() {
        return (
            <div id={'genreWrapper'} className={'shadow-4'}>
                {this.genreGen()}
            </div>
        )
    };
}

export default genreBox;

