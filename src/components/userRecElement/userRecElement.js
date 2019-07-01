import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import { withRouter } from  'react-router-dom';
import { store } from '../../index';

import './style.css';

class UserRecElement extends Component {
    sendToProfileBrowser = () => {
        store.dispatch({type: 'SET_TARGET_UID', payload: this.props.data.uid});
        // delay will let redux update the reducers
        setTimeout(() => {
            this.props.history.push('/profile');
        }, 100);
    };

    render() {
        let { data } = this.props;
        return (
            <React.Fragment>
                {
                    (data) ?
                    <img src={`https://res.cloudinary.com/xufor/image/upload/c_fill,f_auto,g_faces,h_100,q_auto,r_100,w_100/${data.image}`}
                         title={data.name}
                         alt={'elite'}
                         onClick={this.sendToProfileBrowser}
                         className={'i-u-r-element'}
                    /> : <Skeleton circle={true} height={70} width={70}/>
                }
            </React.Fragment>
        );
    }
}



export default withRouter(UserRecElement);

