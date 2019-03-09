import React,{ Component } from 'react';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import sPic from '../../assets/samplePic.png';
import { connect } from 'react-redux';
import './style.css';

//dont use vh in css anymore, use % instead, use of vh should be avoided by all means

class profilePage extends Component {
	topBoxGen = () => {
		return(
			<div id={'topBoxProfilePage'}>
				<img id={'profileImgOnProfilePage'} src={sPic} alt={'pic-1'}/>
				<div id={'nameAndImgWrapperOnProfilePage'}>
					<div id={'nameOnProfilePage'}>
							{this.props.credentials.data.fname + ' '}
							{this.props.credentials.data.sname}
					</div>
					<div id={'lineOnProfilePage'}/>
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