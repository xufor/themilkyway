import React,{ Component } from 'react';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';
import sPic from '../../assets/sPic.jpg';
import { connect } from 'react-redux';
import './style.css';

class profilePage extends Component {
	topBoxGen = () => {
		return(
			<div id={'topBoxProfilePage'}>
				<img id={'pImg'} src={sPic} alt={'pic-1'}/>
		        		<div id={'n'}>
							{this.props.credentials.data.fname + ' '}
							{this.props.credentials.data.sname}
		        		</div>
		        	<div id={'line'}/>
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