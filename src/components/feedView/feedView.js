import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

import GenreElement from '../genreElement/genreElement';
import smallLike from '../../assets/smallLike.png';
import smallEye from '../../assets/smallEye.png';
import './style.css';
import './style-m.css';


class FeedView extends Component {
    genreElementsGen = (data) => {
        if(!data)
            return <Skeleton/>;
        else {
            let { genre } = data, i=0;
            return genre.split(',').map((listItem) => {
                return <GenreElement
                    text={listItem}
                    byPassGen={true}
                    key={i++}
                />
            });
        }
    };

    render() {
        const { data } = this.props;
        return (
            <div id={'feedView'} className={'shadow-4'}>
                <div id={'upper'}>
                    <div id={'headings'}>
                        <div id={'title'}>
                            {
                                (data)
                                    ? <Link to={`/story/${data.sid}`}>{data.title}</Link>
                                    : <Skeleton/>
                            }
                        </div>
                        <div id={'intro'}>
                            {
                                (data)
                                    ? <React.Fragment>A story by<Link to={`/profile/other/${data.uid}`}>{` ${data.name}`}</Link></React.Fragment>
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
                        <div id={'j-t-b-browser-pg'}>
                            {
                                (data)
                                ?<React.Fragment>
                                    <img
                                        id={'z-t-b-browser-pg'}
                                        alt={'likes'}
                                        src={smallLike}
                                        className={'shadow-1'}
                                    />
                                    {data.likes}
                                    <img
                                        id={'y-t-b-browser-pg'}
                                        alt={'views'}
                                        src={smallEye}
                                        className={'shadow-1'}
                                    />
                                    {data.views}
                                </React.Fragment>
                                : <Skeleton/>
                            }
                        </div>
                        <div id={'s-t-fd-view'}>
                            {this.genreElementsGen(data)}
                        </div>
                    </div>
                    <div className={'emptySpace'}/>
                    {
                        (data)
                            ? <img
                                id={'pPic'}
                                src={`https://res.cloudinary.com/xufor/image/upload/c_fill,f_auto,g_faces,h_200,q_auto,r_100,w_200/${data.image}`}
                                alt={'iPic'}
                                title={data.name}
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
