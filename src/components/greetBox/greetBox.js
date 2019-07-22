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
        this.write = React.createRef();
        this.luck = React.createRef();
    };

    componentDidMount() {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        this.setState({ hours });
        const { formatType } = this.props;
        this.changeBarFormat(formatType);
    };

    changeBarFormat  = (type) => {
        if(type === '1') {
            //The if block below avoids unnecessary update of styles
            //when the component is not event present on the page
            setTimeout(() => {
                if(this.write.current !== null && this.luck.current !== null) {
                    this.write.current.style.display= 'none';
                    this.luck.current.style.display= 'block';
                }
            }, 10);
        }
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
        let suffixGen = this.suffixGen;
        let { name } = this.props.credentials;
        let firstName = name.split(" ")[0];
        return (
            <div id={'greetBox'} className={'shadow-5 flex justify-center'}>
                <div id={'greeting'}>Good {suffixGen()} {firstName} !</div>
                <div className={'emptySpace dn db-ns'}/>
                <Link id={'composeLink'} className={'link black dn db-ns'} to={'/compose'}>
                    <div ref={this.write}>Want to write Something?</div>
                </Link>
                <div id={'wishText'} ref={this.luck}>Best of luck with the story!</div>
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