import React, { Component } from 'react';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import GenreBox from '../../components/genreBox/genreBox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PageFooter from '../../components/pageFooter/pageFooter';
import StoryElement from '../storyElement/storyElement';
import SearchElement from '../searchElement/searchElement';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import RippleButton from '../../components/rippleButton/rippleButton'
import editProfile from '../../assets/editProfile.png';
import sPic from '../../assets/samplePic.png';
import { messageBoxViewAction } from '../../actions/messageBoxViewAction';
import { displayLoader } from '../../common';
import { summary } from '../../strings';
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
	}

	// will set the color of 'Basic' div initially
	componentDidMount() {
    	this.mode1.current.style.color = '#3D5AFE';
	}

	// will generate the upper region of profile page
	upperRegionGen = () => {
      const { name } = this.props.credentials;
    	return(
          <div id={'n-p-profile-pg'}>
				<img id={'p-p-profile-pg'} alt={'p89ef'} src={sPic}/>
				<div id={'n-u-profile-pg'}>{`${name}`}</div>
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
					onClick={() => this.changeViewMode('Achievements', this.mode3)}
					ref={this.mode3}>
					Achievements
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
		let {
			dob,
			bio,
			country,
			profession,
			emailId,
		} = this.props.credentials;
		return (
			<div id={'b-c-profile-pg'}>
				<p>{`Bio: ${bio}`}</p>
				<div>{`Birthday: ${dob}`}</div>
				<div>{`Country: ${country}`}</div>
				<div>{`Profession: ${profession}`}</div>
				<div>{`Email: ${emailId}`}</div>
				<img
					id={'e-pic-profile-pg'}
					alt={'e-pic-p-pg'}
					onClick={this.onClickEditButton}
					src={editProfile}
				/>
			</div>
		)
	};

	/* => will generate the content for 'Stories' mode of lower region of profile page
	   => passes two functions to storyElement as props which get triggered when the respective
	   	  buttons are clicked
	   => the storyElement will further pass these buttons to the edit and delete buttons*/
	storiesContentGen = () => {
		let i = 0;
		return (
			names.map((listItem) => {
				return <StoryElement
					name={listItem}
					title={'The Last Leaf'}
					summary={summary}
					key={`searchElement${i++}`}
					mode={'with-buttons'}
					editListener={this.onClickStoryEdit}
					deleteListener={this.onClickStoryDelete}
				/>
			})
		);
	};

	// gets called when delete button for some story is clicked
	onClickStoryDelete = () => {
		this.props.messageBoxViewAction('enabled');
	};

	// gets called when edit button for some story is clicked
	onClickStoryEdit = () => {
		console.log('Story Editing should be performed.')
	};

	// gets called when delete button on confirmation box is clicked
	onDeleteConfirm = () => {
		console.log('Deletion to be performed.')
	};

	achievementsContentGen = () => {
		let {
			followers,
			points,
			views,
			milestones,
		} = this.props.credentials;
		return (
			<div id={'a-c-profile-pg'}>
				<div>{`Followers: ${followers}`}</div>
				<div>{`Views : ${views}`}</div>
				<div>{`Milestones: ${milestones}`}</div>
				<div>{`Points: ${points}`}</div>
			</div>
		)
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

	followingContentGen = () => {
		let i = 0;
		return (
			names.map((listItem) => {
				return <SearchElement
					name={listItem}
					key={`searchElement${i++}`}
					mode={'unfollow'}
				/>
			})
		);
	};

	editingContentGen = () => {
		return (
			<div id={'e-d-profile-pg'}>
				<div>Bio:</div>
				<textarea id={'t-a-profile-pg'}/>
				<div>Country:</div>
				<input id={'i-a-profile-pg'}/>
				<div>Birthday:</div>
				<input type={'date'} id={'i-a-profile-pg'}/>
				<div>Profession:</div>
				<input id={'i-a-profile-pg'}/>
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
		}  else if (mode === 'Achievements') {
			return  this.achievementsContentGen()
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
    	let { boxState } = this.props;
    	return (
       		<div id={'m-b-profile-pg'}>
				{
					(boxState !== 'disabled')
						? displayLoader('Do you really want to delete this story?',
										'decide-and-leave',
										this.onDeleteConfirm
										)
						: undefined
				}
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
	return bindActionCreators({ messageBoxViewAction }, dispatch);
};

const mapStateToProps = (state) => {
	return {
		credentials: state.credentials,
		boxState: state.messageBoxState
	}
};

export default connect(mapStateToProps, mapActionToProps)(ProfilePage);
