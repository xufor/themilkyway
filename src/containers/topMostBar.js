import React, { Component } from 'react';
import '../css/topMostBar.css';
import searchGlass from '../assets/searchGlass.png';
import profilePic from '../assets/profilePic.png';
import galaxyPic from '../assets/galaxyPic.png';
import searchOpener from '../assets/searchOpener.png';
import { updateSearchString } from '../actions/searchStringAction.js';
import { connect } from 'react-redux';
import { bindActionCreators} from "redux";
import { Link } from 'react-router-dom';

class TopMostBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchString: ''
        };
        this.bar = React.createRef();
        this.logo = React.createRef();
        this.search = React.createRef();
        this.user = React.createRef();
        this.pic = React.createRef();
        this.opn = React.createRef();
        this.input = React.createRef();
    }

    componentDidMount() {
        this.bar.current.addEventListener('mouseleave', this.shrink);
        this.bar.current.addEventListener('keypress', this.onEnter);
    }

    componentWillUnmount() {
        this.props.updateSearchString(this.state.searchString);
    }

    shrink = () => {
        this.logo.current.style.fontSize= '2.3rem';
        this.bar.current.style.height= '50px';
        this.bar.current.style.display= 'flex';
        this.bar.current.style.alignItems= 'center';
        this.search.current.style.display= 'none';
        this.user.current.style.display= 'block';
        this.pic.current.style.marginLeft= '5px';
        this.pic.current.style.height= '40px';
        this.pic.current.style.width= '40px';
        this.opn.current.style.display = 'block';
    };

    expand = () => {
        this.logo.current.style.fontSize= '4rem';
        this.bar.current.style.height= '250px';
        this.bar.current.style.display= 'block';
        this.search.current.style.display= 'flex';
        this.user.current.style.display= 'none';
        this.pic.current.style.marginLeft= 'calc(50vw - 50px)';
        this.pic.current.style.height= '100px';
        this.pic.current.style.width= '110px';
        this.opn.current.style.display = 'none';
    };

    onSearchChange = (event) => {
        this.setState({
            searchString: event.target.value
        });
    };

    onEnter = (event) => {
        if(event.key === "Enter"){
            this.props.history.push('/profile');
        }
    };

    render() {
        return (
            <div id="topMostBar" ref={this.bar} className='shadow-5'>
                <img id='galaxyPic' ref={this.pic} className='pointer' alt='galPic' src={galaxyPic}/>
                <Link to={'/home'}>
                    <div id='logoText' ref={this.logo} className='white pointer'>The Milky Way</div>
                </Link>
                <div id='searchWrapper' ref={this.search} >
                    <input id='searchBox' ref={this.input} onChange={this.onSearchChange} type='text' maxLength='30'
                           placeholder='Searching for something?' aria-label='Search'/>
                    <Link to={'/search'}>
                        <img id='searchGlassImage' className='pointer' alt='srhGls' src={searchGlass}/>
                    </Link>
                </div>
                <div className='emptySpace'/>
                <img src={searchOpener} ref={this.opn} onClick={this.expand} alt='srhOpn' id='searchOpenImage'/>
                <Link to={'/profile'}>
                    <img id='profilePic' ref={this.user} src={profilePic} alt={'pPic'}/>
                </Link>
            </div>
        );
    };
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ updateSearchString }, dispatch);
};

export default connect(null, mapActionToProps)(TopMostBar);