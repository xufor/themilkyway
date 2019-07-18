import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { persistor } from './index';
import { toastr } from 'react-redux-toastr';

import HomePage from './components/homePage/homePage';
import ComposePage from './components/composePage/composePage';
import ResetPage from './components/resetPage/resetPage';
import NotFound from './components/notFound/notFound';
import LoginPage, {CANNOT_REACH_SERVER} from './components/loginPage/loginPage';
import RegisterPage, {SUCCESSFULLY_REGISTERED} from './components/registerPage/registerPage';
import ProfilePage from './components/profilePage/profilePage';
import UpdatePassword from './components/updatePassword/updatePassword';
import SearchPage from './components/searchPage/searchPage';
import TagBrowser from './components/tagBrowser/tagBrowser';
import StoryBrowser from './components/storyBrowser/storyBrowser';
import BlackCover from './components/blackCover/blackCover';
import { refreshToken } from './actions/refreshAction';
import { resetTokenStatus } from './actions/resetTokenStatusAction';
import { disableToast } from './actions/disableToastAction';
import { onRevoke } from './actions/onRevokeAction';
import './App.css';
import {
    ALREADY_REGISTERED,
    STORY_TOO_LONG,
    SUMMARY_TOO_LONG,
    INCORRECT_PASSWORD,
    TITLE_TOO_LONG,
    NO_ACCOUNT,
    NOT_BEFORE_A_DAY,
    NOT_CONFIRMED,
    STORY_SUBMITTED,
    CANNOT_LIKE_OWN,
    CANNOT_UNLIKE_OWN,
    NO_MORE_SEARCH_DATA,
    FOLLOW_SUCCESSFUL,
    UNFOLLOW_SUCCESSFUL,
    NO_MORE_GENRE_DATA,
    UPDATE_SUCCESSFUL,
    STORY_EDIT_SUCCESSFUL,
    NO_SUCH_ACCOUNT,
    PASS_SUCCESSFULLY_UPDATED
} from './reducers/showToastReducer';

const NO_MORE_FEED = 'No more feed available. Please try again later.';
const DELETE_SUCCESSFUL = 'Successfully deleted the story.';
const LINK_SENT = 'A reset link has been sent to your email.';
const LINK_EXPIRED = 'The link has expired please request a new link.';
const INVALID_LINK = 'The link is invalid. Make sure it is the one you received via e-mail.';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ow: 0,
            oh: 0,
            ih: 0,
            iw: 0
        }
    }

    screenMapper = () => {
        this.setState({
            ow: window.outerWidth,
            iw: window.innerWidth,
        });
    };

    shouldCover = () => {
        if(this.state.ow < 1140 || this.state.iw < 1140)
            return <Route component={ BlackCover }/>
    };

    componentDidMount() {
        this.screenMapper();
        window.addEventListener('resize', this.screenMapper)
    }

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
        else if(showToast === 'no-fd')
            toastr.success('No more feed', NO_MORE_FEED);
        else if(showToast === 'nt-da')
            toastr.error('Cannot submit', NOT_BEFORE_A_DAY);
        else if(showToast === 'ti-lg')
            toastr.info('Title too long', TITLE_TOO_LONG);
        else if(showToast === 'su-lg')
            toastr.info('Summary too long', SUMMARY_TOO_LONG);
        else if(showToast === 'st-lg')
            toastr.info('Story too long', STORY_TOO_LONG);
        else if(showToast === 'st-sc')
            toastr.success('Successfully submitted', STORY_SUBMITTED);
        else if(showToast === 'cn-li')
            toastr.error('Cannot Like', CANNOT_LIKE_OWN);
        else if(showToast === 'cn-ul')
            toastr.error('Cannot Remove Like', CANNOT_UNLIKE_OWN);
        else if(showToast === 'no-sr')
            toastr.success('No more results', NO_MORE_SEARCH_DATA);
        else if(showToast === 'uf-su')
            toastr.success('Success', UNFOLLOW_SUCCESSFUL);
        else if(showToast === 'fl-su')
            toastr.success('Success', FOLLOW_SUCCESSFUL);
        else if(showToast === 'no-gr')
            toastr.success('No more results', NO_MORE_GENRE_DATA);
        else if(showToast === 'up-su')
            toastr.success('Successful', UPDATE_SUCCESSFUL);
        else if(showToast === 'de-su')
            toastr.success('Deletion Successful', DELETE_SUCCESSFUL);
        else if(showToast === 'se-su')
            toastr.success('Edit Successful', STORY_EDIT_SUCCESSFUL);
        else if(showToast === 'no-sa')
            toastr.error('No Account', NO_SUCH_ACCOUNT);
        else if(showToast === 'em-se')
            toastr.success('Link Sent', LINK_SENT);
        else if(showToast === 'ps-us')
            toastr.success('Password Updated', PASS_SUCCESSFULLY_UPDATED);
        else if(showToast === 'ln-ex')
            toastr.error('Link expired', LINK_EXPIRED);
        else if(showToast === 'ln-in')
            toastr.error('Invalid Link', INVALID_LINK);
    };

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    {this.shouldCover()}
                    <Route path= {'/'} exact component = { LoginPage }/>
                    <Route path= {'/register'} exact component = { RegisterPage }/>
                    <Route path= {'/profile/:uid'} exact component = { ProfilePage }/>
                    <Route path= {'/search/:query'} exact component = { SearchPage }/>
                    <Route path= {'/compose'} exact component = { ComposePage }/>
                    <Route path= {'/edit/:sid'} exact component = { ComposePage }/>
                    <Route path= {'/genre/:genre'} exact component = { TagBrowser }/>
                    <Route path= {'/story/:sid'} exact component = {StoryBrowser}/>
                    <Route path= {'/home'} exact component = { HomePage }/>
                    <Route path= {'/reset'} exact component = { ResetPage }/>
                    <Route path= {'/update/:token'} exact component = { UpdatePassword }/>
                    <Route exact component={ NotFound }/>
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

