import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Stations from './Stations';

const Widget = () => {
    const [stations, setStations] = useState([])
    const [selectedStation, setSelectedStation] = useState(null)

    useEffect(() => {
        fetch("stationData.json")
            .then(res => res.json())
            .then(data => setStations(data))
    }, [])

    return (
        <div className='widget'>
            <Header></Header>
            <Stations
                stations={stations}
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}
            ></Stations>
            <Footer station={selectedStation}></Footer>
        </div>
    );
};

export default Widget;