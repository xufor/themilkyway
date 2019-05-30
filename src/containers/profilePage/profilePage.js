import React, { Component } from 'react';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import GenreBox from '../../containers/genreBox/genreBox';
import RippleButton from '../../components/rippleButton/rippleButton';
import BackgroundLoader from'../../components/backgroundLoader/backgroundLoader';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import sPic from '../../assets/samplePic.png';
import { connect } from 'react-redux';
import './style.css';
import './style-m.css';

class ProfilePage extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		lowerRegionMode: 'Basic'
		}
	}

	upperRegionGen = () => {
      const {firstName, lastName} = this.props.credentials.data;
    	return(
          <div id={'n-p-profile-pg'}>
				<img id={'p-p-profile-pg'} alt={'p89ef'} src={sPic}/>
				<div id={'n-u-profile-pg'}>{`${firstName} ${lastName}`}</div>
          </div>
      )
    };

	middleRegionGen = () => {
		return(
			<React.Fragment>
				<div className={'l-n-profile-pg'}>Basic</div>
				<div>|</div>
				<div className={'l-n-profile-pg'}>Stories</div>
				<div>|</div>
				<div className={'l-n-profile-pg'}>Achievements</div>
				<div>|</div>
				<div className={'l-n-profile-pg'}>Following</div>
				<div>|</div>
				<div className={'l-n-profile-pg'}>Followers</div>
			</React.Fragment>
		)
	};

	lowerRegionGen = () => {
		return(
			<React.Fragment>

			</React.Fragment>
		)
	};

    render() {
    	return (
       		<div id={'m-b-profile-pg'}>
       			<BackgroundLoader bno={3}/>
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