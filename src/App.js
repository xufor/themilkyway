import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { persistor } from './index';
import { toastr } from 'react-redux-toastr';

import WelcomePage from './components/welcomePage/welcomePage';
import HomePage from './components/homePage/homePage';
import ComposePage from './components/composePage/composePage';
import NotFound from './components/notFound/notFound';
import LoginPage, {CANNOT_REACH_SERVER} from './components/loginPage/loginPage';
import RegisterPage, {SUCCESSFULLY_REGISTERED} from './components/registerPage/registerPage';
import ProfilePage from './components/profilePage/profilePage';
import SearchPage from './components/searchPage/searchPage';
import TagBrowser from './components/tagBrowser/tagBrowser';
import StoryBrowser from './components/storyBrowser/storyBrowser';
import { refreshToken } from './actions/refreshAction';
import { resetTokenStatus } from './actions/resetTokenStatusAction';
import { disableToast } from './actions/disableToastAction';
import { onRevoke } from './actions/onRevokeAction';
import './App.css';
import {
    ALREADY_REGISTERED,
    INCORRECT_PASSWORD,
    NO_ACCOUNT,
    NOT_CONFIRMED
} from './reducers/showToastReducer';



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

        // logic for toasts
        // this will check if toast has to be loaded or not
        this.checkForToastLoading();
        // this sets toast back to disabled if it is not already disabled
        if(this.props.showToast !== 'disabled')
            this.props.disableToast()
    }

    checkForToastLoading = () => {
        const { showToast } = this.props;
        if(showToast === 'nt-er')
            toastr.error('Network Error', CANNOT_REACH_SERVER);
        else if(showToast === 'in-pw')
            toastr.info('Incorrect Password', INCORRECT_PASSWORD);
        else if(showToast === 'no-ac')
            toastr.info('No Such Account', NO_ACCOUNT);
        else if(showToast === 'nt-co')
            toastr.info('Inactive User Present', NOT_CONFIRMED);
        else if(showToast === 'ac-pr')
            toastr.info('Active User Present', ALREADY_REGISTERED);
        else if(showToast === 'rg-sc')
            toastr.success('Registration Successful', SUCCESSFULLY_REGISTERED);
    };

    render() {
        return(
          <BrowserRouter>
              <Switch>
                  <Route path= {'/'} exact component = { WelcomePage }/>
                  <Route path= {'/login'} exact component = { LoginPage }/>
                  <Route path= {'/register'} exact component = { RegisterPage }/>
                  <Route path= {'/profile/:target/:uid'} exact component = { ProfilePage }/>
                  <Route path= {'/search'} exact component = { SearchPage }/>
                  <Route path= {'/compose'} exact component = { ComposePage }/>
                  <Route path= {'/tag'} exact component = { TagBrowser }/>
                  <Route path= {'/story/:sid'} exact component = {StoryBrowser}/>
                  <Route path= {'/home'} exact component = { HomePage }/>
                  <Route exact component={NotFound}/>
              </Switch>
          </BrowserRouter>
      );
  };
}

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials,
        tokenStatus: state.tokenStatus,
        showToast: state.showToast
    }
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ refreshToken, resetTokenStatus, onRevoke, disableToast }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(App);

