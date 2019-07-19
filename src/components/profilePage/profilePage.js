import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import Switch from 'react-switch';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';

import { store } from '../../index';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import GenreBox from '../../components/genreBox/genreBox';
import PageFooter from '../../components/pageFooter/pageFooter';
import StoryElement from '../storyElement/storyElement';
import SearchElement from '../searchElement/searchElement';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import RippleButton from '../../components/rippleButton/rippleButton';
import { CANNOT_BE_EMPTY } from '../loginPage/loginPage';
import { TOO_MANY_GENRES, ARE_YOU_SURE } from '../composePage/composePage';
import { RESET_PROFILE_DATA } from '../../reducers/profileReducer';
import { updateProfile } from '../../actions/updateProfileAction';
import { fetchProfile } from '../../actions/fetchProfileAction';
import { throwOut, retImg } from '../../common';
import { tags } from '../../strings';
import editProfile from '../../assets/editProfile.png';
import './style.css';
import './style-m.css';

const PLEASE_CLICK_SAVE = 'Please click the save button in order to save changes.';
const IS_PRIVATE = 'The author has decided not to show his private details.';
const TOO_LONG_BIO = 'Bio can have a maximum of 500 characters.';
const TOO_LONG_PROFESSION = 'Profession can have a maximum of 20 characters.';
const TOO_LONG_COUNTRY = 'Country can have a maximum of 20 characters.';

let listForSelection = tags.map((listItem) => {
	return {value: listItem, label: listItem}
});

let generateDefaultPreferences = (basic) => {
	if(basic.preferences) {
		return basic.preferences.split(',')
			.map((listItem) => {return {label: listItem, value: listItem}});
	}
};

class ProfilePage extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		lowerRegionMode: 'Basic',    // stores the mode of lower region
			bio: null, 				     // stores the bio when editing mode is on
			country: null, 			 	 // stores the country when editing mode is on
			dob: null,				  	 // stores the birthday when editing mode is on
			profession: null,			 // stores the profession when editing mode is on
			image: null,	     	 	 // stores profile image url
			checked: false,				 // stores the privacy options
			genre: [],					 //	stores the genres selected
    	};
		this.mode1 = React.createRef(); 		// ref to the 'Basic' div in middle region
		this.mode2 = React.createRef(); 		// ref to the 'Stories' div in middle region
		this.mode3 = React.createRef(); 		// ref to the 'Achievements' div in middle region
		this.mode4 = React.createRef(); 		// ref to the 'Following' div in middle region
		this.mode5 = React.createRef(); 		// ref to the 'Followers' div in middle region
		this.editBtn = React.createRef();   	// ref to the edit button in basic content
		this.profImg = React.createRef();	    // ref to the edit profile image
	}

	componentDidCatch() {
		throwOut(this.props.history)
	}

	// will set the color of 'Basic' div initially
	componentDidMount() {
		let { uid } = this.props.match.params;
		// setting the color of first mode
		this.mode1.current.style.color = '#3D5AFE';
		// fetching user data
		this.props.fetchProfile(uid);
	}

	// using the will update function
	componentWillUpdate(nextProps) {
		// if this condition goes true we need to load new content
		if(nextProps.match.params.uid !== this.props.match.params.uid) {
			// reset old data
			store.dispatch({type: RESET_PROFILE_DATA});
			// load new data
			this.props.fetchProfile(nextProps.match.params.uid);
		}
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
							ref={this.profImg}
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
		this.profImg.current.style.cursor = 'pointer';
		// cloudinary stuff
		let widget = window.cloudinary.createUploadWidget({
				cloudName: 'xufor',
				uploadPreset: 'yp6g5kw2',
				sources: [
					"local",
					"url",
					"camera",
					"facebook",
					"instagram"
				],
				croppingAspectRatio: 1,
				clientAllowedFormats: ['jpeg','png'],
				croppingDefaultSelectionRatio: 1,
				croppingShowBackButton: true,
				cropping: true,
				multiple: false,
				croppingShowDimensions:true
			},
			(error, result) => {
				if(result.event === 'success') {
					this.setState({image: result.info.path});
					this.profImg.current.src = result.info.secure_url;
					toastr.success('Upload Successful', PLEASE_CLICK_SAVE);
				}
			}
		);
		let showWidget = () => {
			widget.open();
		};
		// adding the event listener
		this.profImg.current.addEventListener('click', showWidget);
		// Unloading all possible data
		let { basic } = this.props.profile;
		this.setState({
			checked: (basic.private !== undefined)? basic.private: false,
			profession: basic.profession,
			dob: basic.dob,
			country: basic.country,
			genre: (generateDefaultPreferences(basic) !== undefined)
				? generateDefaultPreferences(basic)
				: [],
			image: basic.image,
			bio: basic.bio
		});
	};

	// will generate the content for 'Basic' mode of lower region of profile page
	basicContentGen = () => {
		let { basic } = this.props.profile, { uid } = this.props.match.params;
		// checking if private
		if( basic && basic.message && basic.message === IS_PRIVATE)
			return (
				<div id={'n-b-dt-yt-wrapper'}>
					<div id={'n-b-dt-yt'} className={'shadow-5'}>
						The author has decided not to share this information!
					</div>
				</div>
			);
		// return early when no data is found
		if( basic && basic.message && basic.message === 'No data')
			return (
				<div id={'n-b-dt-yt-wrapper'}>
					<div id={'n-b-dt-yt'} className={'shadow-5'}>
						No basic data yet!
					</div>
					{
						(uid === this.props.credentials.uid)?
						<img
							id={'e-pic-profile-pg'}
							alt={'e-pic-p-pg'}
							onClick={this.onClickEditButton}
							src={editProfile}
							className={'grow'}
							ref={this.editBtn}
						/>: undefined
					}
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
				{
					(uid === this.props.credentials.uid)?
						<img
							id={'e-pic-profile-pg'}
							alt={'e-pic-p-pg'}
							onClick={this.onClickEditButton}
							src={editProfile}
							className={'grow'}
							ref={this.editBtn}
						/>: undefined
				}
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
		else if(stories === null || (stories && stories.length === 0)) {
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
		if( favourites && favourites.message && favourites.message === IS_PRIVATE)
			return (
				<div id={'n-b-dt-yt-wrapper'}>
					<div id={'n-b-dt-yt'} className={'shadow-5'}>
						The author has decided not to share this information!
					</div>
				</div>
			);
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
		else if(favourites === null || (favourites && favourites.length === 0)) {
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
		let i = 0, { followers } = this.props.profile;
		if(followers && followers.length > 0)
			return (
				followers.map((listItem) => {
					return <SearchElement
						data={listItem}
						key={`searchElement${i++}`}
						mode={'no-buttons'}
						dilemma={true}
					/>
				})
			);
		else if(followers === null || (followers && followers.length === 0)) {
			return(
				<div id={'n-b-dt-yt-wrapper'}>
					<div id={'n-b-dt-yt'} className={'shadow-5'}>
						No followers yet!
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

	followingContentGen = () => {
		let i = 0, { following } = this.props.profile;
		if( following && following.message && following.message === IS_PRIVATE)
			return (
				<div id={'n-b-dt-yt-wrapper'}>
					<div id={'n-b-dt-yt'} className={'shadow-5'}>
						The author has decided not to share this information!
					</div>
				</div>
			);
		if(following && following.length > 0)
			return (
				following.map((listItem) => {
					return <SearchElement
						data={listItem}
						key={`searchElement${i++}`}
						dilemma={true}
					/>
				})
			);
		else if(following === null || (following && following.length === 0)) {
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

	// react switch functionality method
	handleChange = (checked) => {
		this.setState({ checked });
	};

	// what happens when save button is clicked
	onClickSave = () => {
		let { bio, dob, profession, genre, country, image, checked } = this.state;
		if(bio === undefined
			|| dob === undefined
			|| genre === null
			|| country === undefined
			|| profession === undefined
			|| genre.length === 0
		)
			toastr.info('Cannot be empty', CANNOT_BE_EMPTY);
		else if (genre.length > 3)
			toastr.info('Too many genres', TOO_MANY_GENRES);
		else if(profession.length > 20)
			toastr.info('Too long', TOO_LONG_PROFESSION);
		else if(bio.length > 500)
			toastr.info('Too long', TOO_LONG_BIO);
		else if(country.length > 20)
			toastr.info('Too long', TOO_LONG_COUNTRY);
		else {
			let prefString = '';
			for(let i=0;i<genre.length;i++) {
				prefString += this.state.genre[i].value;
				if(!(i===this.state.genre.length-1)) {
					prefString += ',';
				}
			}
			// if image field is null following block executes
			image = (image === 'No Image available.')? 'no-image': image;
			// confirmation message
			toastr.confirm(ARE_YOU_SURE, {onOk: () => this.props.updateProfile(bio, dob, country, profession, prefString, image, checked)});
		}
	};

	// react select functionality method
	onOptionsChange = (event) => {
		this.setState({genre: event})
	};

	editingContentGen = () => {
		let { basic } = this.props.profile;
		return (
			<div id={'e-d-profile-pg'}>
				<div>Bio:</div>
				<textarea
					id={'t-a-profile-pg'}
					onChange={this.onChangeBio}
					defaultValue={basic.bio}
				/>
				<div>Preferences:</div>
				<Select
					isMulti
					value={this.state.genre}
					options={listForSelection}
					name={'colors'}
					className={'basic-multi-select'}
					classNamePrefix={'select'}
					placeholder={''}
					onChange={this.onOptionsChange}
				/>
				<div>Private: (This option will not let other authors see the basic, following and favourites section of your profile.)</div>
				<label>
					<Switch
						onChange={this.handleChange}
						checked={this.state.checked}
						className={'react-switch'}
					/>
				</label>
				<div>Country:</div>
				<input
					id={'i-a-profile-pg'}
					onChange={this.onChangeCountry}
					defaultValue={basic.country}
				/>
				<div>Birthday:</div>
				<input
					type={'date'}
					id={'i-a-profile-pg'}
					onChange={this.onChangeDob}
					defaultValue={basic.dob}
				/>
				<div>Profession:</div>
				<input
					id={'i-a-profile-pg'}
					onChange={this.onChangeProfession}
					defaultValue={basic.profession}
				/>
				<div id={'btn-i-profile-pg'}>
					<RippleButton
						name={'Save'}
						listener={this.onClickSave}
					/>
				</div>
			</div>
		);
	};

	onChangeBio = (event) => {
		this.setState({bio: event.target.value})
	};

	onChangeProfession = (event) => {
		this.setState({profession: event.target.value})
	};

	onChangeDob = (event) => {
		this.setState({dob: event.target.value})
	};

	onChangeCountry = (event) => {
		this.setState({country: event.target.value})
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
				<BackgroundLoader bno={0}/>
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
	return bindActionCreators({ fetchProfile, updateProfile }, dispatch);
};

const mapStateToProps = (state) => {
	return {
		credentials: state.credentials,
		profile: state.profile
	}
};

export default connect(mapStateToProps, mapActionToProps)(ProfilePage);
