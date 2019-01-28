import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/greetBox.css';

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

    /*Documentation of ComponentDidMount()
    componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here.
    If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in componentWillUnmount().
    You may call setState() immediately in componentDidMount().
    It will trigger an extra rendering, but it will happen before the browser updates the screen.
    This guarantees that even though the render() will be called twice in this case, the user won’t see the intermediate state.
    Use this pattern with caution because it often causes performance issues. In most cases, you should be able to assign the initial state in the constructor() instead.
    It can, however, be necessary for cases like modals and tooltips when you need to measure a DOM node before rendering something that depends on its size or position.
     */

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
            <div id='greetBox' className='center br4 shadow-5 mv1'>
                <div id='greeting'>Good {this.suffixGen()} {this.props.credentials.data.fname} !</div>
                <div className='emptySpace'/>
                <Link id='composeLink' className='link black' to={'/compose'}>Want to write Something?</Link>
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