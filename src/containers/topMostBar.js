import React from 'react';
import '../css/topMostBar.css';
import searchGlass from '../assets/searchGlass.png';
import profilePic from '../assets/profilePic.png';
import { Link } from 'react-router-dom';

const TopMostBar = () => {
    return(
        <div id='topMostBarContainer'>
            <div id="topMostBar" className='center shadow-5 mv1'>
                <Link to={'/home'} id='logoText' className='ml4 link black pointer alg-slf'>The Milky Way</Link>
                <input id='searchBox' className='br4 mr2 alg-slf' type='text' maxLength='30' placeholder='Search' aria-label='Search'/>
                <Link to={'/search'} className='alg-slf'>
                    <img id='searchGlassImage' className='grow mr3 pointer' alt='srhGls' src={searchGlass}/>
                </Link>
                <Link to={'/profile'} className={'alg-slf'}>
                    <img id='profilePic' src={profilePic} alt={'pPic'}/>
                </Link>
                <Link to={'/login'} className='mr3 link black hover-green pointer alg-slf' id='signOut'>SignOut</Link>
            </div>
        </div>
    );
};

export default TopMostBar;