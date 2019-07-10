import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import { withRouter } from  'react-router-dom';

import { retImg } from '../../common';
import './style.css';

class UserRecElement extends Component {
    sendToProfileBrowser = () => {
        let { data } = this.props;
        this.props.history.push(`/profile/${data.uid}`);
    };

    render() {
        let { data } = this.props;
        return (
            <React.Fragment>
                {
                    (data) ?
                    <img src={retImg(data.image,100,100)}
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

