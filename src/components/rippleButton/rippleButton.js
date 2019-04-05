import React, { Component } from 'react';
import './style-inbuilt.scss';
import './style.css';

class RippleButton extends Component {
    componentDidMount() {
        const rippleButtons = document.querySelectorAll('.ripple');

        rippleButtons.forEach(rippleBtn => {
            rippleBtn.addEventListener('click', e => {
                if (!rippleBtn.classList.contains('rippling')) {
                    rippleBtn.classList.add('rippling');
                    rippleBtn.addEventListener('animationend', e => {
                        rippleBtn.classList.add('fade');
                        rippleBtn.classList.remove('rippling');
                        setTimeout(() => {
                            rippleBtn.classList.remove('fade');
                        }, 300);
                    });
                }
            });
        });
    }

    render() {
        const { name } = this.props;
        return (
            <button className={'rip-btn btn-pop ripple'}>{name}</button>
        );
    };
}

export default RippleButton;