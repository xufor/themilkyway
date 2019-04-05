import React, { Component } from 'react';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import GenreBox from '../../containers/genreBox/genreBox';
import UserRecBox from '../../containers/userRecBox/userRecBox';
import RippleButton from '../../components/rippleButton/rippleButton';
import sPic from '../../assets/samplePic.png';
import { connect } from 'react-redux';
import './style.css';
import './style-m.css';

class ProfilePage extends Component {
	leftRegionGen = () => {
		const { firstName , lastName, bio } = this.props.credentials.data;
		console.log(this.props);
		return(
			<div id={'l-r-w-profile-pg'}>
				<div id={'i-w-profile-pg'}>
					<img src={sPic} id={'i-l-r-profile-pg'} className={'shadow-4'} alt={'i1'}/>
				</div>
				<div id={'n-w-profile-pg'}>
					<div id={'n-l-r-profile-pg'}>{`${firstName} ${lastName}`}</div>
				</div>
				<div id={'b-w-profile-pg'}>
					<p id={'b-l-r-profile-pg'}>{bio}</p>
				</div>

			</div>
		);
	};

	rightRegionGen = () => {
		const { country, dob, emailId, followers, following, praises, privacy, profession, views } = this.props.credentials.data;
		console.log(this.props);
		return(
			<div id={'r-r-w-profile-pg'}>
				<div id={'r-r-u-w-profile-pg'}>
					<div id={'db-r-r-profile-pg'}>{`Date of Birth: ${dob}`}</div>
					<div id={'em-r-r-profile-pg'}>{`Email: ${emailId}`}</div>
					<div id={'ct-r-r-profile-pg'}>{`Nationality: ${country}`}</div>
					<div id={'pr-r-r-profile-pg'}>{`Profession: ${profession}`}</div>
					<div id={'py-r-r-profile-pg'}>{`Privacy Settings: ${privacy}`}</div>
				</div>
				<div id={'r-r-b-w-profile-pg'}>
					<div id={'fw-r-r-profile-pg'}>{`Following: ${following}`}</div>
					<div id={'fl-r-r-profile-pg'}>{`Followers: ${followers}`}</div>
					<div id={'ps-r-r-profile-pg'}>{`Praises: ${praises}`}</div>
					<div id={'pr-r-r-profile-pg'}>{`Views: ${views}`}</div>
				</div>
				<div id={'e-b-w-profile-pg'}>
					<RippleButton name={'Edit'}/>
				</div>
			</div>
		);

	};

	render() {
       	return (
       		<div id={'m-b-profile-pg'}>
       			<TopMostBar formatType={'1'}/>
				<GreetBox/>
				<GenreBox/>
				<UserRecBox/>
				<div id={'c-w-profile-pg'} className={'shadow-4'}>
					<div id={'l-r-profile-pg'}>{this.leftRegionGen()}</div>
					<div id={'r-r-profile-pg'}>{this.rightRegionGen()}</div>
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