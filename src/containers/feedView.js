import React, { Component } from 'react';
import { connect } from 'react-redux';
import { summary } from '../strings';
import pPic from '../assets/pPic.jpg';
import '../css/feedView.css';

class FeedView extends Component {
    constructor(props) {
        super(props);
        this.story = '';
        this.type = 'story';
        this.title = 'The Gift of Magi';
    }

    intro = () => {
      if(this.type === 'story') {
          return 'A story by';
      }
      else
          return 'A poem by';
    };

    render() {
        return (
            <div id={'feedView'} className={'shadow-4'}>
                <div id={'upper'}>
                    <div id={'headings'}>
                        <div id={'title'}>{this.title}</div>
                        <div id={'intro'}>
                            {this.intro()}
                            {' '}
                            {this.props.credentials.data.fname}
                            {' '}
                            {this.props.credentials.data.sname}
                        </div>
                    </div>
                    <div className={'emptySpace'}/>
                    <img id={'pPic'} src={pPic} alt={'iPic'}/>
                </div>
                <div id={'sumHeading'}>Summary:</div>
                <p id={'summary'}>{ summary }</p>
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