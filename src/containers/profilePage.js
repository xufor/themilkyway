import React,{ Component } from 'react';
import '../css/profilePage.css';
import sPic from '../assets/sPic.jpg';
import mPraises from '../assets/mPraises.png';
import mFollower from '../assets/mFollower.png';
import mFollowing from '../assets/mFollowing.png';
import mViews from '../assets/mViews.png';
import mRed from '../assets/mR.png';
import mBlue from '../assets/mB.png';
import mYellow from '../assets/mYellow.png';
import mGreen from '../assets/mGreen.png';
import { connect } from 'react-redux';

class profilePage extends Component {
	constructor(props) {
		super(props);
		this.tags = React.createRef();
	}

	componentDidMount() {
		let colors = ['#FF5136', '#13138F', '#2B9F00', '#625192'];
		for(let i = 0; i < this.tags.current.children.length; i++ ) {
			this.tags.current.children[i].style.background = colors[i]
		}
	}

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
						<img className={'mr2'}  id={'mRed'} src={mRed} alt={'pic-2'}/>
						<img className={'mr2'}  id={'mGreen'} src={mGreen} alt={'pic-3'}/>
						<img className={'mr2'}  id={'mBlue'} src={mBlue} alt={'pic-4'}/>
						<img id={'mYellow'}  src={mYellow} alt={'pic-9'}/>
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
				<div id={'fav-head'}>Favourites:</div>
				<div id={'fav'} ref={this.tags}>
					<div className={'tags'}>#Romance</div>
					<div className={'tags'}>#Thriller</div>
					<div className={'tags'}>#Suspense</div>
					<div className={'tags'}>#Slice of Life</div>
				</div>
				<div id={'db'}>Date Of Birth: {this.props.credentials.data.dob}</div>
				<div id={'place'}>Place: {this.props.credentials.data.country}</div>
				<div id={'prof'}>Profession: {this.props.credentials.data.profession}</div>
				<div id={'ed-acct'}>
					<button id={'edit'} className='grow'>Edit Profile</button>
					<button className='grow' id={'dlt'}>Delete My Account</button>
				</div>
			</div>
		);
	};

	render() {
       return (
       	<div id={'boxWrapper'}>
			{this.topBoxGen()}
			{this.midBoxGen()}
			{this.bottomBoxGen()}
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