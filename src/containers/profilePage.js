import React,{ Component} from 'react';
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
	
	topBoxGen = () => {
		return(
			<div id={'topBox'}>
				<img id={'pImg'} src={sPic} alt={'pic-1'}/>
		        <div className={'emptySpace'}/>
		        <div id={'nameWrapper'}>
		        	<div id={'oName'}>
		            	<div id={'fName'}>
		            		{this.props.credentials.data.fname + ' '} 
		            		{this.props.credentials.data.sname}
		            	</div>
		            </div>
					<div id={'pMedal'}>
						<img className={'mr2'}  id={'mRed'} src={mRed} alt={'pic-2'}/>
						<img className={'mr2'}  id={'mGreen'} src={mGreen} alt={'pic-3'}/>
						<img className={'mr2'}  id={'mBlue'} src={mBlue} alt={'pic-4'}/>
						<img className={'mr2'} id={'mYellow'}  src={mYellow} alt={'pic-9'}/>
		        	</div>
		        </div>
				<div id={'goToHome'}></div>
            </div>
		);
	}

	render() {
       return (
              <div id={'boxWrapper'}>
              	{this.topBoxGen()}	
              		<div id={'midBox'}>
              		   <div id='detailWrapper'>
              		   		<img className='mFollower mr2' src={mFollower} alt={'pic-5'}/>
							<div className= 'mt3 mr4'>{this.props.credentials.data.followers}</div>
							<img className='mFollowing mr2' src={mFollowing} alt={'pic-6'}/>
							<div className= 'mt3 mr4'>{this.props.credentials.data.following}</div>
							<img className='mPraises mr2' src={mPraises} alt={'pic-7'}/>
							<div className= 'mt3 mr4'>{this.props.credentials.data.praises}</div>
							<img className='mViews mr2' src={mViews} alt={'pic-8'}/>
							<div className= 'mt3 mr4'>{this.props.credentials.data.views}</div>
						</div>
              		</div>
              		<div id={'bottomBox'}>
              		</div>
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