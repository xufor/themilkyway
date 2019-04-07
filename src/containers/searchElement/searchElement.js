import React, { Component } from 'react';
import RippleButton from '../../components/rippleButton/rippleButton';
import pPic from '../../assets/pPic.jpg';
import './style.css';

class SearchElement extends Component {
    render() {
        let { name } = this.props;
        return (
            <div id={'s-element-wrapper'} className={'shadow-5'}>
                <div className={'n-i-s-element-wrapper'}>
                    <img className={'i-s-element'} src={pPic} alt={'NotYetDecided'}/>
                    <div className={'n-s-element'}>{name}</div>
                    <div className={'emptySpace'}/>
                    <div className={'f-button-s-element'}>
                        <RippleButton name={'Follow'}/>
                    </div>
                </div>
            </div>
        );
    };
}


export default SearchElement;

