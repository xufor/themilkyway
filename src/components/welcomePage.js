import React, { Component } from 'react';
import { sampleQuote } from "../strings";
import { Link } from 'react-router-dom';
import '../css/welcomePage.css';

class WelcomePage extends Component {
    render() {
        return(
            <div id='welcomePageBackground'>
                <div id='welcomeText'>
                    <div id='logo' className='white tc'>The Milky Way</div>
                        <div id='quote' className='white tc'>{ sampleQuote }</div>
                        <div id='author' className='tr'>- Boris Pasternak</div>
                        <div id='buttons'>
                            <button className='routeButton grow'>
                                <Link to={'/login'} className='linkProps link'>Login</Link>
                            </button>
                            <button className='routeButton grow'>
                                <Link to={'/register'} className='linkProps link'>Register</Link>
                            </button>
                        </div>
                    </div>
            </div>
        );
    }
}

export default WelcomePage;