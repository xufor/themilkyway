import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';

import { summary } from '../../strings';
import pPic from '../../assets/pPic.jpg';
import './style.css';
import './style-m.css';

class FeedView extends Component {
    render() {
        const { data } = this.props;
        return (
            <div id={'feedView'} className={'shadow-4'}>
                <div id={'upper'}>
                    <div id={'headings'}>
                        <div id={'title'}>
                            {
                                (data)
                                    ? data.title
                                    : <Skeleton/>
                            }
                        </div>
                        <div id={'intro'}>
                            {
                                (data)
                                    ? `A story by ${data.name}`
                                    : <Skeleton/>
                            }
                        </div>
                        <div id={'timestamp'}>
                            {
                                (data)
                                    ? `submitted on ${data.time.split(' ')[0]}  at ${data.time.split(' ')[1]}`
                                    : <Skeleton/>
                            }
                        </div>
                    </div>
                    <div className={'emptySpace'}/>
                    {
                        (data)
                            ? <img
                                id={'pPic'}
                                src={`https://res.cloudinary.com/xufor/image/upload/c_fill,f_auto,g_faces,h_150,q_auto,r_100,w_150/${data.image}`}
                                alt={'iPic'}
                            />
                            : <div id={'p-pic-sk-ldg'}><Skeleton circle={true} width={150} height={150}/></div>
                    }
                </div>
                <div id={'sumHeading'}>
                    {
                        (data)
                            ? 'Summary:'
                            : <Skeleton/>
                    }
                </div>
                <div id={'summaryContainer'}>
                    <p id={'summary'}>
                        {
                            (data)
                                ? data.summary
                                : <Skeleton height={35}/>
                        }
                    </p>
                </div>
            </div>
        );
    }
}


export default FeedView;
