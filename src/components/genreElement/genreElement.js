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

    styleGenerator = () => {
        // byPassGen props helps to specify that color is explicitly provided
        let { byPassGen } = this.props;
        if(!byPassGen) {
            let { colorSelector } = this.props;
            let c1 = colorSelector % 4;
            let c2 = Math.floor(Math.random() * matColorList[c1].length);
            return {backgroundColor: matColorList[c1][c2]};
        }
    };

    render() {
        let { text } = this.props;
        return (
            <div>
                <Link to={`/genre/${text}`}>
                    <div
                        style={this.styleGenerator()}
                        className={'genreBoxElement'}
                        title={text}
                        onClick={this.clickHandler}
                    >
                        {text}
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