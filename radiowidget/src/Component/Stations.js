import React from 'react';
import Station from './Station';

const Stations = ({ stations, selectedStation, setSelectedStation }) => {
    return (
        <div className='stations'>
            {
                stations.map(station => <Station
                    key={station._id}
                    station={station}
                    selectedStation={selectedStation}
                    setSelectedStation={setSelectedStation}
                ></Station>)
            }
        </div>
    );
};

export default Stations;