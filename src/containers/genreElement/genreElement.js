import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { matColorList } from '../../strings';
import { tagTopicAction } from '../../actions/tagTopicAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.css';

class GenreElement extends Component {
    clickHandler = (event) => {
        this.props.tagTopicAction(event.currentTarget.title);
    };

    colorGenerator = () => {
        let result = Math.floor(Math.random() * (45));
        return matColorList[result];
    };

    render() {
        let { contentToBeDisplayed } = this.props;
        return (
            <div>
                <Link to={'/tagBrowser'}>
                    <div
                        style={{backgroundColor: `${this.colorGenerator()}`}}
                        className={'genreBoxElement'}
                        title={contentToBeDisplayed}
                        onClick={this.clickHandler}>
                        {contentToBeDisplayed}
                    </div>
                </Link>
            </div>
        )
    };
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ tagTopicAction }, dispatch);
};

export default connect(null, mapActionToProps)(GenreElement);