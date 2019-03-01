import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { tags } from '../../strings';
import { colorGen } from '../../common';
import { tagTopicAction } from '../../actions/tagTopicAction';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './style.css';

class genreBox extends Component {
    clickHandler = (event) => {
        this.props.tagTopicAction(event.currentTarget.title);
    };

    genreGen = () => {
        let listOfTags = [];
        for(let i = 0; i<= tags.length; i++) {
            listOfTags[i] =
                <Link to={'/tagView'}>
                    <div
                        style={{backgroundColor: `${colorGen()}`}}
                        className={'genreBoxElement'}
                        title={tags[i]}
                        onClick={this.clickHandler}>
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

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ tagTopicAction }, dispatch);
};

export default connect(null, mapActionToProps)(genreBox);

