import React,{ Component} from 'react';
import '../css/profilePage.css';
import samplePic from '../assets/samplePic.jpg';
import { connect } from 'react-redux';

class profilePage extends Component {
	render() {
       return (
       	<div id='profilePageBackground'>
	        <div id='mainBox'>
	         	<div id='lbox' className='ml4 mt4 mr4'>
	       			<img id='samplePic' src={samplePic} alt='srhGls'/>
	       			<div className='tc mt5 b'>
		       			<div className= 'mt3'>Followers: {this.props.credentials.data.followers}</div>
		       			<div className= 'mt3'>Following: {this.props.credentials.data.following}</div>
		       			<div className= 'mt3'>Praises: {this.props.credentials.data.praises}</div>
		       			<div className= 'mt3'>Views: {this.props.credentials.data.views}</div>
	       			</div>
	       		</div>	
	       		<div id='rbox'>
	       			More Content Coming Soon!
	       		</div>
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