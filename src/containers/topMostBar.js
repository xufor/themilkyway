import React from 'react';
import '../css/topMostBar.css';
import searchGlass from '../assets/searchGlass.png';
import profilePic from '../assets/profilePic.png';
import { Link } from 'react-router-dom';

const TopMostBar = () => {
    return(
        <div id="topMostBar" className='shadow-5'>
            <Link to={'/home'}>
                <div  id='logoText' className='white pointer'>The Milky Way</div>
            </Link>
            <div id='searchWrapper'>
                <input id='searchBox' className='alg-slf' type='text' maxLength='30' placeholder='Search' aria-label='Search'/>
                <Link to={'/search'}>
                    <img id='searchGlassImage' className='pointer' alt='srhGls' src={searchGlass}/>
                </Link>
            </div>
            {/*<Link to={'/profile'}>*/}
                {/*<img id='profilePic' src={profilePic} alt={'pPic'}/>*/}
            {/*</Link>*/}
        </div>
    );
};

export default TopMostBar;