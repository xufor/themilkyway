import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import WelcomePage from './components/welcomePage/welcomePage';
import LoginPage from './components/loginPage/loginPage';
import HomePage from './components/homePage/homePage';
import RegisterPage from './components/registerPage/registerPage';
import ProfilePage from './components/profilePage/profilePage';
import SearchPage from './components/searchPage/searchPage';
import ComposePage from './components/composePage/composePage';
import TagBrowser from './components/tagBrowser/tagBrowser';
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
