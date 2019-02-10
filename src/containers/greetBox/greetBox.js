import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';

class GreetBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: ''
        };
    };

    componentDidMount() {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        this.setState({ hours });
    };

    suffixGen = () => {
        if(this.state.hours >= 12 && this.state.hours < 17) {
            return 'Afternoon';
        } else if(this.state.hours >= 17 && this.state.hours < 20) {
            return 'Evening';
        } else if (this.state.hours >= 20 && this.state.hours < 24) {
            return 'Night';
        } else {
            return 'Morning';
        }
    };

    render() {
        return (
                <div id={'greetBox'} className={'shadow-5'}>
                <div id={'greeting'}>Good {this.suffixGen()} {this.props.credentials.data.fname} !</div>
                <div className={'emptySpace'}/>
                <Link id={'composeLink'} className={'link black'} to={'/compose'}>Want to write Something?</Link>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
  return {
      credentials: state.credentials
  }
};

export default connect(mapStateToProps)(GreetBox);