import React from 'react';

const Footer = ({ station }) => {
    return (
        <footer className='footer'>
            {
                station &&
                <>
                    <h4 className='text'>CURRENTLY PLAYING</h4>
                    <h3 className='station-name'>{station?.name}</h3>
                </>
            }
        </footer>
    );
};

export default Footer;