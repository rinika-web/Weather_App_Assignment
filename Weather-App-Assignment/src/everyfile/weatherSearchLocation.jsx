import React, { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

function WeatherSearchLocation({ addQuery }) { // Accept addQuery prop
  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city !== '') {
      addQuery({ q: city }); // Add new city query
      setCity(''); // Reset city input after search
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        addQuery({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }); // Add new location query
      });
    }
  };

  return (
    <div>
      <div className="flex flex-row text-center justify-center text-gray-800 dark:text-red-200">
        <button
          className="text-2xl text-gray-800 dark:text-red-200 transition ease-out hover:scale-150 mx-5"
          onClick={handleLocationClick}
        >
          <UilLocationPoint />
        </button>

        <input
          type="text"
          placeholder="search city here"
          className="text-xl text-center font-serif focus:outline-none capitalize text-gray-800"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
        />

        <button
          className="text-2xl text-gray-800 dark:text-red-200 transition ease-out hover:scale-150 mx-5"
          onClick={handleSearchClick}
        >
          <UilSearch />
        </button>
      </div>
    </div>
  );
}

export default WeatherSearchLocation;
