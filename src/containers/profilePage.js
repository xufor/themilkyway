import React,{ Component} from 'react';
import '../css/profilePage.css';
import samplePic from '../assets/samplePic.jpg';
import editPen from '../assets/editPen.png';
import editPaper from '../assets/editPaper.png';
import { connect } from 'react-redux';

class profilePage extends Component {
	render() {
       return (
       	<div id='profilePageBackground'>
	        <div id='mainBox'>
	         	<div id='lbox' className='ml4 mt4 mr4'>
	       			<img id='samplePic' src={samplePic} alt='smpPic'/>
	       			<div className='tc mt3 b'>
			       		<div id='nameWrapper'>
			       			<div>{this.props.credentials.data.fname} {this.props.credentials.data.sname}</div>
			       			<img id='editPen' className='ml3' src={editPen} alt='ePic'/>
			       		</div>
			       		<div className= 'mt5'>Followers: {this.props.credentials.data.followers}</div>
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