import React, { Component } from 'react';
import { connect } from 'react-redux';
import { summary } from '../../strings';
import Skeleton from 'react-loading-skeleton';
import pPic from '../../assets/pPic.jpg';
import './style.css';
import './style-m.css';

class FeedView extends Component {
    constructor(props) {
        super(props);
        this.title = 'The Gift of Magi';
    }

    intro = () => {
        return 'A story by';
    };

    render() {
        const intro = this.intro;
        const { firstName, lastName } = this.props.credentials.data;
        return (
            <div id={'feedView'} className={'shadow-4'}>
                <div id={'upper'}>
                    <div id={'headings'}>
                        <div id={'title'}>{this.title || <Skeleton/>}</div>
                        <div id={'intro'}>
                            {`${intro()} ${firstName} ${lastName}` || <Skeleton/>}
                        </div>
                        <div id={'timestamp'}>
                            {`submitted on ${'March 6 2019'}  at ${'5:45 pm'}` || <Skeleton/>}
                        </div>
                    </div>
                    <div className={'emptySpace'}/>
                    <img id={'pPic'} src={pPic} alt={'iPic'}/>
                </div>
                <div id={'sumHeading'}>{'Summary:'}</div>
                <p id={'summary'}>{ summary || <Skeleton/> }</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials
    };
};

export default connect(mapStateToProps)(FeedView);