import React, { Component } from 'react';
import { sampleQuote } from "../strings";
import { Link } from 'react-router-dom';
import '../css/welcomePage.css';

class WelcomePage extends Component {
    render() {
        return(
            <div className='welcomePageBackground'>
                <div className='welcomeText'>
                    <div className='logo white tc'>The Milky Way</div>
                        <div className='quote white tc'>{ sampleQuote }</div>
                        <div className='author tr'>- Boris Pasternak</div>
                        <div className= 'buttons'>
                            <button className='routeButton grow'>
                                <Link to= '/login' className='linkProps'>Login</Link>
                            </button>
                            <button className='routeButton grow'>
                                <Link to= '/register' className='linkProps'>Register</Link>
                            </button>
                        </div>
                    </div>
            </div>
        );
    }
}

export default WelcomePage;