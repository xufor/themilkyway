import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { matColorList } from '../../strings';
import './style.css';

class GenreElement extends Component {
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
                    >
                        {text}
                    </div>
                </Link>
            </div>
        )
    };
}

export default GenreElement;