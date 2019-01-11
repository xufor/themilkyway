import React, { Component } from 'react';
import WelcomePage from './components/welcomePage.js';
import LoginPage from './containers/loginPage.js';
import HomePage from './containers/homePage.js';
import RegisterPage from './containers/registerPage.js';
import {BrowserRouter, Route} from "react-router-dom";
import './App.css';


class App extends Component {
  render() {
      return(
          <BrowserRouter>
              <div>
                  <Route path= '/' exact component = { WelcomePage }/>
                  <Route path= '/login' exact component = { LoginPage }/>
                  <Route path= '/register' exact component = { RegisterPage }/>
                  <Route path= '/home' exact component = { HomePage }/>
              </div>
          </BrowserRouter>
      );
  };
};


export default App;
