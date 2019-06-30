import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { persistor } from './index';

import WelcomePage from './components/welcomePage/welcomePage';
import HomePage from './components/homePage/homePage';
import ComposePage from './components/composePage/composePage';
import LoginPage from './components/loginPage/loginPage';
import RegisterPage from './components/registerPage/registerPage';
import ProfilePage from './components/profilePage/profilePage';
import SearchPage from './components/searchPage/searchPage';
import TagBrowser from './components/tagBrowser/tagBrowser';
import StoryBrowser from './components/storyBrowser/storyBrowser';
import { refreshToken } from './actions/refreshAction';
import { resetTokenStatus } from './actions/resetTokenStatusAction';
import { onRevoke } from './actions/onRevokeAction';
import './App.css';


class App extends Component {
    componentDidUpdate() {
        /* > expired is set in tokenStatus if access token expires
           > revoked is set in tokenStatus if refresh token expires or logout occurred at some point
           before refresh token expired. */
        if(this.props.tokenStatus === 'access_token_expired') {
            let refresh_token = this.props.credentials.refresh_token;
            this.props.refreshToken(refresh_token);
            this.props.resetTokenStatus();
            setTimeout(() => {
                document.location.reload(); // a delay will ensure the updation of redux
            }, 300)
        } else if(this.props.tokenStatus === 'access_token_revoked') {
            this.props.resetTokenStatus(); // will prevent looping
            persistor.purge().then(
                () =>
                {
                    this.props.onRevoke();
                    setTimeout(() => {
                        document.location.reload(); // a delay will ensure the updation of redux
                    }, 300)
                }
            )
        } else if(this.props.tokenStatus === 'access_token_unrefreshable') {
            // in this case we don't require a reload as the reload will be facilitated by expiration
            this.props.resetTokenStatus(); // prevents looping
            persistor.purge().then(() => {this.props.onRevoke();})
        }
    }

    render() {
        return(
          <BrowserRouter>
              <div>
                  <Route path= {'/'} exact component = { WelcomePage }/>
                  <Route path= {'/login'} exact component = { LoginPage }/>
                  <Route path= {'/register'} exact component = { RegisterPage }/>
                  <Route path= {'/profile'} exact component = { ProfilePage }/>
                  <Route path= {'/search'} exact component = { SearchPage }/>
                  <Route path= {'/compose'} exact component = { ComposePage }/>
                  <Route path= {'/tag'} exact component = { TagBrowser }/>
                  <Route path= {'/story'} exact component = {StoryBrowser}/>
                  <Route path= {'/home'} exact component = { HomePage }/>
              </div>
          </BrowserRouter>
      );
  };
}

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials,
        tokenStatus: state.tokenStatus,
    }
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ refreshToken, resetTokenStatus, onRevoke }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(App);

