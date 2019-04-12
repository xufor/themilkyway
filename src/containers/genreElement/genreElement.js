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
        let { colorSelector } = this.props;
        let c1 = colorSelector % 4;
        let c2 = Math.floor(Math.random() * matColorList[c1].length);
        return matColorList[c1][c2];
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