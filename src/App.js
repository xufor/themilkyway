import React, { Component } from 'react';
import WelcomePage from './components/welcomePage/welcomePage';
import LoginPage from './containers/loginPage/loginPage';
import HomePage from './containers/homePage/homePage';
import RegisterPage from './containers/registerPage/registerPage';
import ProfilePage from './containers/profilePage/profilePage';
import SearchPage from './containers/searchPage/searchPage';
import ComposePage from './containers/composePage/composePage';
import TagBrowser from './containers/tagBrowser/tagBrowser';
import {BrowserRouter, Route} from "react-router-dom";
import './App.css';


class App extends Component {
    render() {
        return(
          <BrowserRouter>
              <div>
                  <Route path= {'/welcome'} exact component = { WelcomePage }/>
                  <Route path= {'/login'} exact component = { LoginPage }/>
                  <Route path= {'/register'} exact component = { RegisterPage }/>
                  <Route path= {'/profile'} exact component = { ProfilePage }/>
                  <Route path= {'/search'} exact component = { SearchPage }/>
                  <Route path= {'/compose'} exact component = { ComposePage }/>
                  <Route path= {'/tagBrowser'} exact component = { TagBrowser }/>
                  <Route path= {'/'} exact component = { HomePage }/>
              </div>
          </BrowserRouter>
      );
  };
}


export default App;
