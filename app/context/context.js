// context/PlaceContext.js
'use client'
import React, { createContext, useState, useContext } from 'react';

const PlaceContext = createContext();

export const PlaceProvider = ({ children }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  console.log(selectedPlace)
  return (
    <PlaceContext.Provider value={{ selectedPlace, setSelectedPlace }}>
      {children}
    </PlaceContext.Provider>
  );
};

export const usePlace = () => useContext(PlaceContext);
