import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

import RippleButton from '../../components/rippleButton/rippleButton';
import './style.css';

class SearchElement extends Component {
    buttonRenderer = () => {
        let { mode } = this.props;
        if(mode === 'follow') {
            return (
                <div className={'f-button-s-element'}>
                    <RippleButton name={'Follow'}/>
                </div>
            );
        } else if(mode === 'unfollow') {
            return (
                <div className={'f-button-s-element'}>
                    <RippleButton name={'Unfollow'}/>
                </div>
            );
        }
    };


    render() {
        let { data } = this.props;
        return (
            <div id={'s-element-wrapper'} className={'shadow-4'}>
                <div className={'n-i-s-element-wrapper'}>
                    {
                        (data)?
                        <img
                            className={'i-s-element'}
                            src={`https://res.cloudinary.com/xufor/image/upload/c_fill,f_auto,g_faces,h_150,q_auto,r_100,w_150/${data.image}`}
                            alt={'s-d-img'}
                        />: <Skeleton circle={true} height={100} width={100}/>
                    }
                    {
                        (data)?
                        <div className={'n-s-element'}>
                            <Link to={`/profile/${data.uid}`}>
                                {data.name}
                            </Link>
                        </div>: <span className={'n-s-element'}><Skeleton count={1} height={20} width={300}/></span>
                    }
                    <div className={'emptySpace'}/>
                    {
                        (data)?
                            this.buttonRenderer()
                            :undefined
                    }
                    </div>
            </div>
        );
    };
}


export default SearchElement;

