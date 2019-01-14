import React from 'react';
import '../css/topMostBar.css';
import searchGlass from '../assets/SearchGlass.png';
import signIcon from '../assets/SignIcon.png';

const TopMostBar = () => {
    return(
        <div id='topMostBarContainer'>
            <div id="topMostBar" className='center br4 shadow-5 mv1'>
                <img id='signIcon' className='grow alg-slf ml2 pointer' alt='sgnIco' src={signIcon}/>
                <div id='logoText' className='ml4 link pointer alg-slf'>The Milky Way</div>
                <input id='searchBox' className='br4 mr2 alg-slf' type='text' maxLength='30' placeholder='Search' aria-label='Search'/>
                <img id='searchGlassImage' className='grow alg-slf mr3 pointer' alt='srhGls' src={searchGlass}/>
                <div className='mr2 link hover-green pointer alg-slf' id='signOut'>SignOut</div>
            </div>
        </div>
    );
};

export default TopMostBar;