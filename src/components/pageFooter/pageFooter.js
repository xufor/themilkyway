import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { persistor } from '../../index';
import { withRouter } from 'react-router-dom';

import { store } from '../../index';
import { reloader } from '../../common';
import { ON_REVOKE } from '../../actions/onRevokeAction';
import { logout } from '../../actions/logoutAction';
import './style.css';
import './style-m.css';

class PageFooter extends Component {
    onClickLogout = () => {
        this.props.logout().then( () => {
            persistor.purge().then(
                () => {
                    store.dispatch({type: ON_REVOKE});
                    this.props.history.push('/');
                    reloader(1000);
                }
            )
        })
    };

    render() {
        return(
            <div>
                <div id={'whiteBarInFooter'}/>
                <div id={'footerContentWrapper'}>
                    <div
                        onClick={this.onClickLogout}
                        id={'logout'}
                        className={'white pointer'}
                    >
                        Logout{'   '}|{'   '}
                    </div>
                    <Link
                        to={'/terms'}
                        id={'terms'}
                        className={'white'}
                    >
                        Terms
                    </Link>
                    <div id={'copyright'}>All rights reserved.</div>
                    <div id={'company'}>The Milky Way © 2019</div>
                </div>
            </div>
        );
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ logout }, dispatch)
};

export default connect(null, mapActionToProps)(withRouter(PageFooter));