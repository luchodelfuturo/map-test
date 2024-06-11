// components/Map.js
'use client';
import React, { useState, useEffect } from 'react';
import { Map, Marker, APIProvider } from '@vis.gl/react-google-maps';

const MapComp = ({ cafes }) => {
    const [position, setPosition] = useState({ lat: -34.6037, lng: -58.3816 });

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div style={{ height: '100vh', width: '100%' }}>
                <Map zoom={14} center={position}>
                    {cafes.map((cafe) => (
                        <Marker
                            key={cafe.place_id}
                            position={{ lat: cafe.geometry.location.lat, lng: cafe.geometry.location.lng }}
                        />
                    ))}
                </Map>
            </div>
        </APIProvider>
    );
};

export default MapComp;
