import React, { Component } from 'react';

import RippleButton from '../../components/rippleButton/rippleButton';
import pPic from '../../assets/pPic.jpg';
import './style.css';

class SearchElement extends Component {
    buttonRenderer = () => {
        let { mode } = this.props;
        if(mode === 'follow') {
            return (
                <div className={'f-button-s-element'}>
                    <RippleButton name={'Follow'}/>
                </div>
            );
        } else if(mode === 'unfollow') {
            return (
                <div className={'f-button-s-element'}>
                    <RippleButton name={'Unfollow'}/>
                </div>
            );
        }
    };


    render() {
        let { name } = this.props;
        return (
            <div id={'s-element-wrapper'} className={'shadow-4'}>
                <div className={'n-i-s-element-wrapper'}>
                    <img className={'i-s-element'} src={pPic} alt={'NotYetDecided'}/>
                    <div className={'n-s-element'}>{name}</div>
                    <div className={'emptySpace'}/>
                    {this.buttonRenderer()}
                </div>
            </div>
        );
    };
}


export default SearchElement;

