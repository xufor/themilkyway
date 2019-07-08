import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';

import searchGlass from '../../assets/searchGlass.png';
import profilePic from '../../assets/profilePic.png';
import galaxyPic from '../../assets/galaxyPic.png';
import searchOpener from '../../assets/searchOpener.png';
import goHome from '../../assets/goHome.png';
import { updateBarState } from '../../actions/barStateAction';
import './style.css';
import './style-m.css';

const SEARCH_STRING_EMPTY = 'Search field cannot be empty.';
const LESS_OR_GREATER_STRING = 'The length of search string should be between 5 and 100 characters.';

class TopMostBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchString: '',
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
        const { formatType } = this.props;
        this.changeBarFormat(formatType);
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
        this.logo.current.style.fontSize= '37px';
        this.bar.current.style.height= '60px';
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
        if(event.key === 'Enter'){
            this.onSearchClickHandler();
        }
    };

    changeBarFormat  = (type) => {
        if(type === '1') {
            this.go.current.style.display = 'block';
            setTimeout(() => {
                if (this.user.current !== null && this.opn.current !== null) {
                    this.user.current.style.display = 'none';
                    this.opn.current.style.display = 'none';
                }
            }, 10);
        }
    };

    onSearchClickHandler = () => {
        if(this.state.searchString === '')
            toastr.error('Cannot be empty', SEARCH_STRING_EMPTY);
        if(this.state.searchString.length < 5 || this.state.searchString.length > 100)
            toastr.error('Invalid search request', LESS_OR_GREATER_STRING);
        else
            this.props.history.push(`/search/${this.state.searchString}`);
    };

    render() {
        return (
            <div
                id={'topMostBar'}
                ref={this.bar}
                className={'shadow-5'}
            >
                <img
                    id={'galaxyPic'}
                    ref={this.pic}
                    className={'pointer'}
                    alt={'galPic'}
                    src={galaxyPic}
                />
                <Link to={'/home'}>
                    <div
                        id={'logoText'}
                        ref={this.logo}
                        className={'white pointer'}
                    >
                        The Milky Way
                    </div>
                </Link>
                <div
                    id={'searchWrapper'}
                    ref={this.search}
                >
                    <input
                        id={'searchBox'}
                        onChange={this.onSearchChange}
                        type={'text'}
                        maxLength={'30'}
                        onKeyPress={this.onEnter}
                        placeholder={'Searching for something?'}
                        aria-label={'Search'}
                    />
                    <img
                        id={'searchGlassImage'}
                        onClick={this.onSearchClickHandler}
                        className={'pointer'}
                        alt={'srhGls'}
                        src={searchGlass}
                    />
                </div>
                <div className={'emptySpace'}/>
                <img
                    src={searchOpener}
                    ref={this.opn}
                    onClick={this.expand}
                    alt={'srhOpn'}
                    id={'searchOpenImage'}
                />
                <Link to={`/profile/${this.props.credentials.uid}`}>
                    <img
                        id={'profilePic'}
                        ref={this.user}
                        src={profilePic}
                        alt={'pPic'}
                    />
                </Link>
                <Link to={'/home'}>
                    <img
                        id={'goHomeBtn'}
                        ref={this.go}
                        src={goHome}
                        alt={'hm'}
                    />
                </Link>
            </div>
        );
    };
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ updateBarState }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        topBarState: state.barState,
        credentials: state.credentials
    };
};

export default connect(mapStateToProps, mapActionToProps)(TopMostBar);