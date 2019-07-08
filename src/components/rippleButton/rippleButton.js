import React, { Component } from 'react';
import './style-inbuilt.scss';

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
        const { name, listener, cRef } = this.props;
        return (
            <button
                className={'rip-btn btn-pop ripple'}
                ref={cRef}
                onClick={listener}
            >
                {name}
            </button>
        );
    };
}

export default RippleButton;