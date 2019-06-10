import React, { Component } from 'react';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import GenreBox from '../../components/genreBox/genreBox';
import { connect } from 'react-redux';

import PageFooter from '../../components/pageFooter/pageFooter';
import StoryElement from '../storyElement/storyElement';
import SearchElement from '../searchElement/searchElement';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import RippleButton from '../../components/rippleButton/rippleButton'
import editProfile from '../../assets/editProfile.png';
import sPic from '../../assets/samplePic.png';
import { summary } from '../../strings';
import { names } from '../../strings';
import './style.css';
import './style-m.css';

class ProfilePage extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		lowerRegionMode: 'Basic',
			bio: '',
			country: '',
			dob: '',
			profession: ''
		};
		this.mode1 = React.createRef();
		this.mode2 = React.createRef();
		this.mode3 = React.createRef();
		this.mode4 = React.createRef();
		this.mode5 = React.createRef();
	}

	componentDidMount() {
    	this.mode1.current.style.color = '#3D5AFE';
	}

	upperRegionGen = () => {
      const {name} = this.props.credentials;
    	return(
          <div id={'n-p-profile-pg'}>
				<img id={'p-p-profile-pg'} alt={'p89ef'} src={sPic}/>
				<div id={'n-u-profile-pg'}>{`${name}`}</div>
          </div>
      )
    };

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

	changeViewMode = (mode, targetElement) => {
		this.setState({lowerRegionMode: mode});
		targetElement.current.style.color = '#3D5AFE';
		let listOfModes = [this.mode1, this.mode2, this.mode3, this.mode4, this.mode5]
		for(let i=0; i<listOfModes.length; i++) {
			if(listOfModes[i].current !== targetElement.current) {
				listOfModes[i].current.style.color = 'black';
			}
		}
	};

	onclickEditButton = () => {
		this.setState({lowerRegionMode: 'Editing'});
	};

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
					onClick={this.onclickEditButton}
					src={editProfile}
				/>
			</div>
		)
	};

	storiesContentGen = () => {
		let i = 0;
		return (
			names.map((listItem) => {
				return <StoryElement
					name={listItem}
					title={'The Last Leaf'}
					summary={summary}
					key={`searchElement${i++}`}
				/>
			})
		);
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
    	return (
       		<div id={'m-b-profile-pg'}>
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


const mapStateToProps = (state) => {
	return {
		credentials: state.credentials
	}
};

export default connect(mapStateToProps)(ProfilePage);
