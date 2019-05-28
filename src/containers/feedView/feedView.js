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

    render() {
        const { uid, firstName, lastName } = this.props.credentials.data;
        return (
            <div id={'feedView'} className={'shadow-4'}>
                <div id={'upper'}>
                    <div id={'headings'}>
                        <div id={'title'}>
                            {
                                (uid !== '')
                                    ? this.title
                                    : <Skeleton/>
                            }
                        </div>
                        <div id={'intro'}>
                            {
                                (uid !== '')
                                    ? `A story by ${firstName} ${lastName}`
                                    : <Skeleton/>
                            }
                        </div>
                        <div id={'timestamp'}>
                            {
                                (uid !== '')
                                    ? `submitted on ${'March 6 2019'}  at ${'5:45 pm'}`
                                    : <Skeleton/>
                            }
                        </div>
                    </div>
                    <div className={'emptySpace'}/>
                    {
                        (uid !== '')
                            ? <img id={'pPic'} src={pPic} alt={'iPic'}/>
                            : <div id={'p-pic-sk-ldg'}><Skeleton circle={true} width={150} height={150}/></div>
                    }
                </div>
                <div id={'sumHeading'}>
                    {
                        (uid !== '')
                            ? 'Summary:'
                            : <Skeleton/>
                    }
                </div>
                <div id={'summaryContainer'}>
                    <p id={'summary'}>
                        {
                            (uid !== '')
                                ? summary
                                : <Skeleton height={35}/>
                        }
                    </p>
                </div>
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