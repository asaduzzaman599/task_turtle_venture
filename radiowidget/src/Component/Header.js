import React from 'react';
import backArrow from './../PNG/back-arrow.png'
import switchLogo from './../PNG/switch.png'
const Header = () => {
    return (
        <header className='header'>

            <button>
                <img className='logo' src={backArrow} alt="" />
            </button>

            <h2 className='title'>Station</h2>

            <button>
                <img className='logo' src={switchLogo} alt="" />
            </button>
        </header>
    );
};

export default Header;