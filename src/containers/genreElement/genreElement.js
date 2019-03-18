import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { colorGen } from '../../common';
import { tagTopicAction } from '../../actions/tagTopicAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.css';

class genreElement extends Component {
    clickHandler = (event) => {
        this.props.tagTopicAction(event.currentTarget.title);
    };

    render() {
        let { contentToBeDisplayed } = this.props;
        return (
            <div>
                <Link to={'/tagView'}>
                    <div
                        style={{backgroundColor: `${colorGen()}`}}
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

export default connect(null, mapActionToProps)(genreElement);