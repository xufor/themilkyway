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
            ow: 0,
            sw: 0,
            dev: 0
        }
    }

    componentDidMount() {
        let x = document.getElementById('genreWrapper');
        let e =  document.getElementById('genreElementsWrapper');
        let ow = x.offsetWidth;
        let sw = x.scrollWidth;
        this.setState({ow: ow, sw: sw});
        window.addEventListener('resize', ()=> {
            this.setState({ow: x.offsetWidth, sw: x.scrollWidth, dev: 0});
            e.style.transform = `translateX(0px)`;
        });
    }

    genreGen = () => {
        let i =0;
         return tags.map((listItem) => {
            return <GenreElement contentToBeDisplayed={listItem} key={`genreElement${i++}`}/>
        });
    };

    leftClickHandler = () => {
        let {ow, sw, dev} = this.state;
        let e =  document.getElementById('genreElementsWrapper');
        if((-1 * dev) < (sw - ow) && (-1 * (dev-300)) < (sw - ow)) {
            dev -= 300;
            this.setState({dev: dev});
            e.style.transform = `translateX(${dev}px)`;
        } else {
            dev -= (sw - ow + dev);
            this.setState({dev: dev});
            e.style.transform = `translateX(${ow - sw}px)`;
        }
   };

   rightClickHandler = () => {
       let {dev} = this.state;
       let e =  document.getElementById('genreElementsWrapper');
       if( (dev < 0) && (dev + 300) < 0) {
           dev += 300;
           this.setState({dev: dev});
           e.style.transform = `translateX(${dev}px)`;
       } else {
           dev += (-1 * dev);
           this.setState({dev: dev});
           e.style.transform = `translateX(${dev}px)`;
       }
   };

   render() {
       return (
           <div id={'genreWrapper'} className={'shadow-4'}>
               <img id={'leftButtonGenreBox'}  onClick={this.leftClickHandler} src={left} alt={'lft'}/>
               <img id={'rightButtonGenreBox'} onClick={this.rightClickHandler} src={right} alt={'rht'}/>
               <div id={'genreElementsWrapper'}>{this.genreGen()}</div>
           </div>
       )
   };
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ tagTopicAction }, dispatch);
};

export default connect(null, mapActionToProps)(GenreBox);

