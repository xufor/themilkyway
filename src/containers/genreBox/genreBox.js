import React, { Component } from 'react';
import { tags } from '../../strings';
import GenreElement from '../genreElement/genreElement';
import { tagTopicAction } from '../../actions/tagTopicAction';
import { bindActionCreators } from 'redux';
import left from '../../assets/left.png';
import right from '../../assets/right.png';
import { connect } from 'react-redux';
import './style.css';

class GenreBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ow: 0, //offSetWidth
            sw: 0, //scrollWidth
            dev: 0 //deviation
        };
        this.gw = React.createRef(); // Outer Wrapper
        this.ew = React.createRef(); // Elements Wrapper

    }

    componentDidMount() {
        let gw = this.gw.current;
        let ow = gw.offsetWidth;
        let sw = gw.scrollWidth;
        this.setState({ow: ow, sw: sw});
        window.addEventListener('resize', this.resizeListener);
    }

    resizeListener = () => {
        let gw = this.gw.current;
        let ew = this.ew.current;
        this.setState({ow: gw.offsetWidth, sw: gw.scrollWidth, dev: 0});
        ew.style.transform = `translateX(0px)`;
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeListener);
    }

    genreGen = () => {
        let i =0;
         return tags.map((listItem) => {
            return <GenreElement contentToBeDisplayed={listItem} colorSelector={i} key={`genreElement${i++}`}/>
        });
    };

    leftClickHandler = () => {
        let {ow, sw, dev} = this.state;
        let ew = this.ew.current;
        if((-1 * dev) < (sw - ow) && (-1 * (dev-300)) < (sw - ow)) {
            dev -= 300;
            this.setState({dev: dev});
            ew.style.transform = `translateX(${dev}px)`;
        } else {
            dev -= (sw - ow + dev);
            this.setState({dev: dev});
            ew.style.transform = `translateX(${ow - sw}px)`;
        }
   };

   rightClickHandler = () => {
       let {dev} = this.state;
       let ew = this.ew.current;
       if( (dev < 0) && (dev + 300) < 0) {
           dev += 300;
           this.setState({dev: dev});
           ew.style.transform = `translateX(${dev}px)`;
       } else {
           dev += (-1 * dev);
           this.setState({dev: dev});
           ew.style.transform = `translateX(${dev}px)`;
       }
   };

   render() {
       const genreGen = this.genreGen;
       return (
           <div id={'genreWrapper'} ref={this.gw} className={'shadow-4'}>
               <img id={'leftButtonGenreBox'}  onClick={this.leftClickHandler} src={left} alt={'lft'}/>
               <img id={'rightButtonGenreBox'} onClick={this.rightClickHandler} src={right} alt={'rht'}/>
               <div id={'genreElementsWrapper'} ref={this.ew}>{genreGen()}</div>
           </div>
       )
   };
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ tagTopicAction }, dispatch);
};

export default connect(null, mapActionToProps)(GenreBox);

