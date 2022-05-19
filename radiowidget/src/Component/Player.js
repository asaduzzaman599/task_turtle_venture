import React from 'react';
import plus from './../PNG/plus.png'
import minus from './../PNG/minus.png'
import ellipse from './../PNG//Ellipse.png'
const Player = () => {
    return (
        <div className='player'>
            <button>
                <img src={minus} className="logo" alt="" />
            </button>
            <img src={ellipse} className='player-img' alt="" />
            <button>
                <img src={plus} className="logo" alt="" />
            </button>
        </div>
    );
};

export default Player;