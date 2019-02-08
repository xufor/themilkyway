import React,{ Component} from 'react';
import '../css/profilePage.css';
import sPic from '../assets/sPic.jpg';
import { connect } from 'react-redux';

class profilePage extends Component {
	render() {
       return (
              <div id={'boxWrapper'}>
              		<div id={'topBox'}>
              			<img id={'pImg'} src={sPic} alt={'pic-1'}/>
              			<div id='detailWrapper'>
							<div className= 'mt3'>Followers: {this.props.credentials.data.followers}</div>
							<div className= 'mt3'>Following: {this.props.credentials.data.following}</div>
							<div className= 'mt3'>Praises: {this.props.credentials.data.praises}</div>
							<div className= 'mt3'>Views: {this.props.credentials.data.views}</div>
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