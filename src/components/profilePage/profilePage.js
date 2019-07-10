import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import GenreBox from '../../components/genreBox/genreBox';
import PageFooter from '../../components/pageFooter/pageFooter';
import StoryElement from '../storyElement/storyElement';
import SearchElement from '../searchElement/searchElement';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import RippleButton from '../../components/rippleButton/rippleButton';
import { fetchProfile } from '../../actions/fetchProfileAction';
import { throwOut, resetAnomaly, retImg } from "../../common";
import editProfile from '../../assets/editProfile.png';
import { names } from '../../strings';
import './style.css';
import './style-m.css';

class ProfilePage extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		lowerRegionMode: 'Basic', // stores the mode of lower region
			bio: '', 				  // stores the bio when editing mode is on
			country: '', 			  // stores the country when editing mode is on
			dob: '',				  // stores the birthday when editing mode is on
			profession: ''			  // stores the profession when editing mode is on
		};
		this.mode1 = React.createRef(); // ref to the 'Basic' div in middle region
		this.mode2 = React.createRef(); // ref to the 'Stories' div in middle region
		this.mode3 = React.createRef(); // ref to the 'Achievements' div in middle region
		this.mode4 = React.createRef(); // ref to the 'Following' div in middle region
		this.mode5 = React.createRef(); // ref to the 'Followers' div in middle region
		this.editBtn = React.createRef(); // ref to the edit button in basic content
	}

	// will set the color of 'Basic' div initially
	componentDidMount() {
    	const { uid } = this.props.match.params;
		// setting the color of first mode
		this.mode1.current.style.color = '#3D5AFE';
		// removing edit button based on user type
		if(uid !== this.props.credentials.uid && this.editBtn.current)
			this.editBtn.current.style.display = 'none';
		// fetching user data
		this.props.fetchProfile(uid);
	}

	// will generate the upper region of profile page
	upperRegionGen = () => {
		let { basic } = this.props.profile;
		return(
			<div id={'n-p-profile-pg'}>
				{
					(basic)
						? <img
							id={'p-p-profile-pg'}
							alt={'p89ef'}
							src={retImg(basic.image, 200, 200)}
						/> : <Skeleton circle={true} width={150} height={150}/>
				}

				{
					(basic)
						? <div id={'n-u-profile-pg'}>{`${basic.name}`}</div>
						: <div id={'n-u-profile-pg'}><Skeleton/></div>
				}
          	</div>
      	)
    };

	/* => will generate the middle region of profile page
	   => each div with a mode name, when clicked , will call changeViewMode() with mode and
	      ref to the div tobe colored as parameters */
	middleRegionGen = () => {
		return(
			<React.Fragment>
				<div
					className={'l-n-profile-pg'}
					onClick={() => this.changeViewMode('Basic', this.mode1)}
					ref={this.mode1}>
					Basic
				</div>
				<div>|</div>
				<div
					className={'l-n-profile-pg'}
					onClick={() => this.changeViewMode('Stories', this.mode2)}
					ref={this.mode2}>
					Stories
				</div>
				<div>|</div>
				<div
					className={'l-n-profile-pg'}
					onClick={() => this.changeViewMode('Favourites', this.mode3)}
					ref={this.mode3}>
					Favourites
				</div>
				<div>|</div>
				<div
					className={'l-n-profile-pg'}
					onClick={() => this.changeViewMode('Following', this.mode4)}
					ref={this.mode4}>
					Following
				</div>
				<div>|</div>
				<div
					className={'l-n-profile-pg'}
					onClick={() => this.changeViewMode('Followers', this.mode5)}
					ref={this.mode5}>
					Followers
				</div>
			</React.Fragment>
		)
	};

	/* will set the mode of lower region and set the color of target div while
	   setting all other divs to be black color*/
	changeViewMode = (mode, targetElement) => {
		this.setState({lowerRegionMode: mode});
		targetElement.current.style.color = '#3D5AFE';
		let listOfModes = [this.mode1, this.mode2, this.mode3, this.mode4, this.mode5];
		for(let i=0; i<listOfModes.length; i++) {
			if(listOfModes[i].current !== targetElement.current) {
				listOfModes[i].current.style.color = 'black';
			}
		}
	};

	// will change the mode to 'Editing' when the edit profile button is clicked
	onClickEditButton = () => {
		this.setState({lowerRegionMode: 'Editing'});
	};

	// will generate the content for 'Basic' mode of lower region of profile page
	basicContentGen = () => {
		let { basic } = this.props.profile;
		// return early when no data is found
		if( basic && basic.message && basic.message === 'No data')
			return (
				<div id={'n-b-dt-yt-wrapper'}>
					<div id={'n-b-dt-yt'} className={'shadow-5'}>
						No basic data yet!
					</div>
					<img
						id={'e-pic-profile-pg'}
						alt={'e-pic-p-pg'}
						onClick={this.onClickEditButton}
						src={editProfile}
						className={'grow'}
						ref={this.editBtn}
					/>
				</div>
			);
		// if data is available show normal response
		return (
			<div id={'b-c-profile-pg'}>
				{
					(basic)
						? <p>{`Bio: ${basic.bio}`}</p>
						: <p><Skeleton/></p>
				}
				{
					(basic)
						? <div>{`Birthday: ${basic.dob}`}</div>
						: <div><Skeleton/></div>
				}
				{
					(basic)
						? <div>{`Country: ${basic.country}`}</div>
						: <div><Skeleton/></div>
				}
				{
					(basic)
						? <div>{`Profession: ${basic.profession}`}</div>
						: <div><Skeleton/></div>
				}
				{
					(basic)
						? <div>{`Email: ${basic.email}`}</div>
						: <div><Skeleton/></div>
				}
				<img
					id={'e-pic-profile-pg'}
					alt={'e-pic-p-pg'}
					onClick={this.onClickEditButton}
					src={editProfile}
					className={'grow'}
					ref={this.editBtn}
				/>
			</div>
		)
	};

	/* => will generate the content for 'Stories' mode of lower region of profile page
	   => passes two functions to storyElement as props which get triggered when the respective
	   	  buttons are clicked
	   => the storyElement will further pass these buttons to the edit and delete buttons*/
	storiesContentGen = () => {
		let i = 0, { stories } = this.props.profile;
		if(stories && stories.length > 0)
			return (
				stories.map((listItem) => {
					return <StoryElement
						data={listItem}
						key={`storyElement${i++}`}
						mode={'with-buttons'}
					/>
				})
			);
		else if(stories && stories.length === 0) {
			return(
				<div id={'n-b-dt-yt-wrapper'}>
					<div id={'n-b-dt-yt'} className={'shadow-5'}>
						No stories yet!
					</div>
				</div>
			);
		}
		else {
			let x = [];
			for (i = 0; i < 7; i++)
				x[i] = <StoryElement
					key={`storyElement${i}`}
					mode={'no-buttons'}
				/>;
			return x;
		}
	};

	favouritesContentGen = () => {
		let i = 0, { favourites } = this.props.profile;
		if(favourites && favourites.length > 0)
			return (
				favourites.map((listItem) => {
					return <StoryElement
						data={listItem}
						key={`storyElement${i++}`}
						mode={'no-buttons'}
					/>
				})
			);
		else if(favourites && favourites.length === 0) {
			return(
				<div id={'n-b-dt-yt-wrapper'}>
					<div id={'n-b-dt-yt'} className={'shadow-5'}>
						No favourites yet!
					</div>
				</div>
			);
		}
		else {
			let x = [];
			for (i = 0; i < 7; i++)
				x[i] = <StoryElement
					key={`storyElement${i}`}
					mode={'no-buttons'}
				/>;
			return x;
		}
	};

	followersContentGen = () => {
		let i = 0;
		return (
			names.map((listItem) => {
				return <SearchElement
					name={listItem}
					key={`searchElement${i++}`}
					mode={'follow'}
				/>
			})
		);
	};

	// appends an already_following with true as value
	appendAlreadyFollowing = (object) => {
		object.already_following = true;
		return object;
	};

	followingContentGen = () => {
		let i = 0, { following } = this.props.profile;
		if(following && following.length > 0)
			return (
				following.map((listItem) => {
					return <SearchElement
						data={this.appendAlreadyFollowing(listItem)}
						key={`searchElement${i++}`}
					/>
				})
			);
		else if(following && following.length === 0) {
			return(
				<div id={'n-b-dt-yt-wrapper'}>
					<div id={'n-b-dt-yt'} className={'shadow-5'}>
						Not following anyone yet!
					</div>
				</div>
			);
		}
		else {
			let x = [];
			for (i = 0; i < 7; i++)
				x[i] = <SearchElement key={`searchElement${i++}`}/>;
			return x;
		}
	};

	onChangeBasicDetails = (event) => {
		this.setState({dob: event.target.value})
	};

	editingContentGen = () => {
		return (
			<div id={'e-d-profile-pg'}>
				<div>Bio:</div>
				<textarea
					id={'t-a-profile-pg'}
					onChange={this.onChangeBasicDetails}
				/>
				<div>Country:</div>
				<input
					id={'i-a-profile-pg'}
					onChange={this.onChangeBasicDetails}
				/>
				<div>Birthday:</div>
				<input
					type={'date'}
					id={'i-a-profile-pg'}
					onChange={this.onChangeBasicDetails}
				/>
				<div>Profession:</div>
				<input
					id={'i-a-profile-pg'}
					onChange={this.onChangeBasicDetails}
				/>
				<RippleButton name={'Save'}
				/>
			</div>
		);
	};

	lowerRegionGen = () => {
		let mode = this.state.lowerRegionMode;
		if (mode === 'Basic') {
			return this.basicContentGen()
		} else if (mode === 'Stories') {
			return this.storiesContentGen()
		}  else if (mode === 'Favourites') {
			return  this.favouritesContentGen()
		} else if (mode === 'Following') {
			return  this.followingContentGen()
		} else if (mode === 'Followers') {
			return  this.followersContentGen()
		} else if (mode === 'Editing') {
			return  this.editingContentGen()
		} else {
			return undefined;
		}
	};

    render() {
    	return (
       		<div id={'m-b-profile-pg'}>
				{throwOut()}
				<BackgroundLoader bno={1}/>
				<TopMostBar formatType={'1'}/>
				<GreetBox/>
				<ButtonSlider
					targetComponent={GenreBox}
					dur={1.5}
					def={500}
				/>
				<div id={'c-b-profile-pg'} className={'shadow-4'}>
					<div id={'u-r-profile-pg'}>{this.upperRegionGen()}</div>
					<div id={'m-r-profile-pg'}>{this.middleRegionGen()}</div>
					<div id={'l-r-profile-pg'}>{this.lowerRegionGen()}</div>
				</div>
				<PageFooter/>
			</div>
	  	 );
	}
}


const mapActionToProps = (dispatch) => {
	return bindActionCreators({ fetchProfile }, dispatch);
};

const mapStateToProps = (state) => {
	return {
		credentials: state.credentials,
		profile: state.profile
	}
};

export default connect(mapStateToProps, mapActionToProps)(ProfilePage);
