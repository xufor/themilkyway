import React, { Component } from 'react';
import '../css/topMostBar.css';
import searchGlass from '../assets/searchGlass.png';
import profilePic from '../assets/profilePic.png';
import galaxyPic from '../assets/galaxyPic.png';
import { Link } from 'react-router-dom';

class TopMostBar extends Component {
    constructor(props) {
        super(props);
        this.bar = React.createRef();
        this.logo = React.createRef();
        this.search = React.createRef();
        this.user = React.createRef();
        this.pic = React.createRef();
    }

    componentDidMount() {
        this.bar.current.addEventListener('mouseleave', this.shrink);
        this.bar.current.addEventListener('mouseenter', this.expand);

    }

    shrink = () => {
        console.log(this.bar.current.style);
        this.logo.current.style.fontSize= '1.5rem';
        this.bar.current.style.height = '50px';
        this.bar.current.style.display = 'flex';
        this.bar.current.style.alignItems= 'center';
        this.search.current.style.display= 'none';
        this.user.current.style.display= 'block';
        this.pic.current.style.marginLeft= '5px';
        this.pic.current.style.height= '50px';
        this.pic.current.style.width= '50px';
    };

    expand = () => {
        this.logo.current.style.fontSize= '3rem';
        this.bar.current.style.height = '250px';
        this.bar.current.style.display = 'block'
        this.search.current.style.display= 'flex';
        this.user.current.style.display= 'none';
        this.pic.current.style.marginLeft= 'calc(50vw - 50px)';
        this.pic.current.style.height= '100px';
        this.pic.current.style.width= '110px';
    };

    render() {
        return (
            <div id="topMostBar" ref={this.bar} className='shadow-5'>
                <img id='galaxyPic' ref={this.pic} className='pointer' alt='galPic' src={galaxyPic}/>
                <Link to={'/home'}>
                    <div id='logoText' ref={this.logo} className='white pointer'>The Milky Way</div>
                </Link>
                <div id='searchWrapper' ref={this.search} >
                    <input id='searchBox' className='alg-slf' type='text' maxLength='30'
                           placeholder='Searching for something?' aria-label='Search'/>
                    <Link to={'/search'}>
                        <img id='searchGlassImage' className='pointer' alt='srhGls' src={searchGlass}/>
                    </Link>
                </div>
                <div className='emptySpace'/>
                <Link to={'/profile'}>
                <img id='profilePic' ref={this.user} src={profilePic} alt={'pPic'}/>
                </Link>
            </div>
        );
    };
}

export default TopMostBar;