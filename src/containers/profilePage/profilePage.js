import React,{ Component } from 'react';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import sPic from '../../assets/sPic.jpg';
import mPraises from '../../assets/mPraises.png';
import mFollower from '../../assets/mFollower.png';
import mFollowing from '../../assets/mFollowing.png';
import mViews from '../../assets/mViews.png';
import star from '../../assets/star.png';
import { connect } from 'react-redux';
import './style.css';

class profilePage extends Component {
	topBoxGen = () => {
		return(
			<div id={'topBox'}>
				<img id={'pImg'} src={sPic} alt={'pic-1'}/>
		        <div className={'emptySpace'}/>
		        <div id={'naWrapper'}>
		        	<div id={'n'}>
						{this.props.credentials.data.fname + ' '}
						{this.props.credentials.data.sname}
		        	</div>
					<div id={'a'}>
						<div className={'emptySpace'}/>
						<img className={'mr2 star'} src={star} alt={'pic-2'}/>
						<img className={'mr2 star'} src={star} alt={'pic-3'}/>
						<img className={'mr2 star'} src={star} alt={'pic-4'}/>
						<img className={'star'} src={star} alt={'pic-9'}/>
		        	</div>
		        </div>
            </div>
		);
	};

	midBoxGen = () => {
		return(
			<div id={'midBox'}>
				<div id='detailWrapper'>
					<img id={'mFollower'} src={mFollower} alt={'pic-5'}/>
					<div>{this.props.credentials.data.followers}</div>
					<img id={'mFollowing'} src={mFollowing} alt={'pic-6'}/>
					<div>{this.props.credentials.data.following}</div>
					<img id={'mPraises'}  src={mPraises} alt={'pic-7'}/>
					<div>{this.props.credentials.data.praises}</div>
					<img id={'mViews'} src={mViews} alt={'pic-8'}/>
					<div>{this.props.credentials.data.views}</div>
				</div>
			</div>
		);
	};

	bottomBoxGen = () => {
		return (
			<div id={'bottomBox'}>
				<p id={'bio'}>Bio: {this.props.credentials.data.bio}</p>
				<div id={'db'}>Date Of Birth: {this.props.credentials.data.dob}</div>
				<div id={'place'}>Place: {this.props.credentials.data.country}</div>
				<div id={'prof'}>Profession: {this.props.credentials.data.profession}</div>
				<div id={'ed-acct'}>
					<button id={'edit'} className='grow'>Edit Profile</button>
				</div>
			</div>
		);
	};

	render() {
       return (
       	<div>
       		<TopMostBar calledFrom={'profilePage'}/>
			<GreetBox/>
       		<div id={'profileBoxWrapper'}>
				{this.topBoxGen()}
				{this.midBoxGen()}
				{this.bottomBoxGen()}
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