import React,{ Component } from 'react';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import sPic from '../../assets/samplePic.png';
import { connect } from 'react-redux';
import './style.css';
import './style-m.css';

class profilePage extends Component {
	topBoxGen = () => {
		let { firstName, lastName} = this.props.credentials.data;
		return(
			<div id={'profileBoxUpperRegion'}>
				<img id={'profileImgOnProfilePage'} className={'shadow-5'} src={sPic} alt={'pic-1'}/>
				<div id={'nameLineBtnWrapperOnProfilePage'}>
					<div id={'nameOnProfilePage'}>
							{firstName + ' ' + lastName}
					</div>
					<div id={'editButtonOnProfilePage'} className={'grow'}>Edit</div>
					<div id={'lineOnProfilePage'}/>
				</div>
            </div>
		);
	};

    basicInfo = () => {
		let { dob, emailId} = this.props.credentials.data;
		return(
    		<div id={'basicInfoProfilePage'} className={'shadow-4'}>
    			<div id={'dateEmailInfo'}>
    				<div id={'dob'}>Birthday: {dob}</div><br/>
    				<div id={'email'}>Email: {emailId}</div>
    			</div>
    		</div>
    	);
    };

    achievementsInfo = () => {
    	let { followers, praises, milestones, views} = this.props.credentials.data;
    	return(
    		<div id={'achievementsInfoProfilePage'} className={'shadow-4'}>
    			<div id={'statsOnProfilePageWrapper'}>
    				<div id={'follower'}>Followers: {followers}</div><br/>
    				<div id={'milestones'}>Milestones: {milestones}</div><br/>
    				<div id={'likes'}>Likes: {praises}</div><br/>
    				<div id={'views'}>Views: {views}</div>
    			</div>
    		</div>
    		);
    };

    advancedInfo = () => {
		let { following, bio, privacy} = this.props.credentials.data;
    	return(
           <div id={'advancedInfoProfilePage'} className={'shadow-4'}>
    			<div id={'folBioPrivacy'}>
    				<div id={'following'}>Following: {following}</div><br/>
    				<div id={'bio'}>Bio: {bio}</div><br/>
    				<div id={'privacy'}>Privacy Options: {privacy}</div>
    			</div>
    		</div>
    		);
    };

	render() {
       	return (
       		<div id={'outerMostWrapperOfProfilePage'}>
       			<TopMostBar calledFrom={'profilePage'}/>
				<GreetBox/>
       			<div id={'profilePageBoxWrapper'}>
					{this.topBoxGen()}
					{this.basicInfo()}
					{this.achievementsInfo()}
					{this.advancedInfo()}
				</div>
				<PageFooter/>
			</div>
	  	 );
	};
}		

	
const mapStateToProps = (state) => {
	return {
		credentials: state.credentials
	}
};

export default connect(mapStateToProps)(profilePage);