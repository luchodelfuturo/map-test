'use client';
import React, { useEffect, useState } from 'react';

const Details = () => {
    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => {
        const place = localStorage.getItem('selectedPlace');
        if (place) {
            setSelectedPlace(JSON.parse(place));
        }
        console.log(place)

    }, []);

    if (!selectedPlace) {
        return <div>No place selected</div>;
    }
    console.log(selectedPlace)
    return (
        <div>

            {selectedPlace && (
                <img src={selectedPlace} alt={`Photo of ${selectedPlace.name}`} />
            )}
        </div>
    );
};

export default Details;
