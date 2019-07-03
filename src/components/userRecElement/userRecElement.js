import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import { withRouter } from  'react-router-dom';

import './style.css';

class UserRecElement extends Component {
    sendToProfileBrowser = () => {
        let { data } = this.props;
        this.props.history.push(`/profile/other/${data.uid}`);
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

