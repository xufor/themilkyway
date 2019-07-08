import React,{ Component } from 'react';
import { Link } from "react-router-dom";
import './style.css';
import './style-m.css';

class PageFooter extends Component {
    render() {
        return(
            <div>
                <div id={'whiteBarInFooter'}/>
                <div id={'footerContentWrapper'}>
                    <Link to={'/'} id={'logout'} className={'white'}>Logout{'   '}|{'   '}</Link>
                    <Link to={'/terms'} id={'terms'} className={'white'}>Terms</Link>
                    <div id={'copyright'}>All rights reserved.</div>
                    <div id={'company'}>The Milky Way © 2019</div>
                </div>
            </div>
        );
    }
}

export default PageFooter;