import React,{ Component } from 'react';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import sPic from '../../assets/samplePic.png';
import { connect } from 'react-redux';
import './style.css';

class profilePage extends Component {
	topBoxGen = () => {
		return(
			<div id={'topBoxProfilePage'}>
				<img id={'profileImgOnProfilePage'} src={sPic} alt={'pic-1'}/>
				<div id={'nameLineBtnWrapperOnProfilePage'}>
					<div id={'nameOnProfilePage'}>
							{this.props.credentials.data.fname + ' '}
							{this.props.credentials.data.sname}
					</div>
					<div id={'editButtonOnProfilePage'} className={'grow'}>Edit</div>
					<div id={'lineOnProfilePage'} className={'shadow-4'}/>
				</div>
            </div>
		);
	};

    basicInfo = () => {
    	return(
    		<div id={'basicInfoProfilePage'} className={'shadow-4'}>
    			<div id={'dateEmailInfo'}>
    				<div id={'dob'}>Date Of Birth: {this.props.credentials.data.dob}</div>
    				<div id={'email'}>Email Id: {this.props.credentials.data.emailid}</div>
    			</div>
    		</div>
    	);
    };

    achievementsInfo = () => {
    	return(
    		<div id={'achievementsInfoProfilePage'} className={'shadow-4'}>
    			<div id={'statsOnProfilePageWrapper'}>
    				<div id={'follower'}>Followers: {this.props.credentials.data.followers}</div>
    				<div id={'milestones'}>Milestones: {this.props.credentials.data.milestones}</div>
    				<div id={'likes'}>Likes: {this.props.credentials.data.praises}</div>
    				<div id={'views'}>Views: {this.props.credentials.data.views}</div>
    			</div>
    		</div>
    		);
    };

    advancedInfo = () => {
    	return(
           <div id={'advancedInfoProfilePage'} className={'shadow-4'}>
    			<div id={'folBioPrivacy'}>
    				<div id={'following'}>Following: {this.props.credentials.data.following}</div>
    				<div id={'bio'}>Bio: {this.props.credentials.data.bio}</div>
    				<div id={'privacy'}>Privacy: {this.props.credentials.data.privacy}</div>
    			</div>
    		</div>
    		);
    };

	render() {
       	return (
       		<div>
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