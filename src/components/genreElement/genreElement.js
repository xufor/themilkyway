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
        // byPassGen props helps to specify that color is explicitly provided
        let { byPassGen } = this.props;
        if(!byPassGen) {
            let { colorSelector } = this.props;
            let c1 = colorSelector % 4;
            let c2 = Math.floor(Math.random() * matColorList[c1].length);
            return matColorList[c1][c2];
        } else {
            let { explicitColor } = this.props;
            return explicitColor;
        }
    };

    render() {
        let { text} = this.props;
        return (
            <div>
                <Link to={'/tag'}>
                    <div
                        style={{backgroundColor: `${this.colorGenerator()}`}}
                        className={'genreBoxElement'}
                        title={text}
                        onClick={this.clickHandler}>
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