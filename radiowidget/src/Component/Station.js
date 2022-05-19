import React from 'react';
import Player from './Player';

const Station = ({ station, selectedStation, setSelectedStation }) => {
    const { _id, name, channel, other } = station
    return (
        <>
            <div className='station' onClick={() => setSelectedStation(station)}>
                <h3 className='text'>{name}</h3>
                <h3 className="text"><b>{channel},{other}</b></h3>
            </div>
            {
                selectedStation?._id === _id && <Player></Player>
            }
        </>
    );
};

export default Station;