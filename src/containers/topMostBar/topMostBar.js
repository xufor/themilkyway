import React, { Component } from 'react';
import searchGlass from '../../assets/searchGlass.png';
import profilePic from '../../assets/profilePic.png';
import galaxyPic from '../../assets/galaxyPic.png';
import searchOpener from '../../assets/searchOpener.png';
import goHome from '../../assets/goHome.png';
import { updateBarState } from '../../actions/barStateAction';
import { updateSearchString } from '../../actions/searchStringAction.js';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import './style.css';
import './style-m.css';

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
        this.go = React.createRef();
    }

    componentDidMount() {
        const { calledFrom } = this.props;
        if(calledFrom === 'profilePage') {
            this.accToProfilePage();
        }
    }

    componentWillUnmount() {
        this.props.updateBarState('shrink-enabled');
    }

    componentDidUpdate() {
        if(this.props.topBarState === 'shrink-enabled') {
            this.shrink();
        }
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
        this.props.updateBarState('expand-enabled');
    };

    onSearchChange = (event) => {
        this.setState({
            searchString: event.target.value
        });
    };

    onEnter = (event) => {
        if(event.key === "Enter"){
            this.props.updateSearchString(this.state.searchString);
            this.props.history.push('/search');
        }
    };

    accToProfilePage = () => {
        this.user.current.style.display= 'none';
        this.go.current.style.display= 'block';
        this.opn.current.style.display= 'none';
    };

    onSearchClickHandler = () => {
        this.props.updateSearchString(this.state.searchString);
    };

    render() {
        return (
            <div id="topMostBar" ref={this.bar} className='shadow-5'>
                <img id='galaxyPic' ref={this.pic} className='pointer' alt='galPic' src={galaxyPic}/>
                <Link to={'/home'}>
                    <div id='logoText' ref={this.logo} className='white pointer'>The Milky Way</div>
                </Link>
                <div id='searchWrapper' ref={this.search} >
                    <input id='searchBox' onChange={this.onSearchChange} type='text' maxLength='30'
                           onKeyPress={this.onEnter} placeholder='Searching for something?' aria-label='Search'/>
                    <Link to={'/search'} onClick={this.onSearchClickHandler}>
                        <img id='searchGlassImage' className='pointer' alt='srhGls' src={searchGlass}/>
                    </Link>
                </div>
                <div className='emptySpace'/>
                <img src={searchOpener} ref={this.opn} onClick={this.expand} alt='srhOpn' id={'searchOpenImage'}/>
                <Link to={'/profile'}>
                    <img id='profilePic' ref={this.user} src={profilePic} alt={'pPic'}/>
                </Link>
                <Link to={'/home'}>
                    <img id={'goHomeBtn'} ref={this.go} src={goHome} alt={'hm'}/>
                </Link>
            </div>
        );
    };
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ updateSearchString, updateBarState }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        topBarState: state.barState
    };
};

export default connect(mapStateToProps, mapActionToProps)(TopMostBar);