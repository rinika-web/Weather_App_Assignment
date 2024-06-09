import React from 'react';
import { UilSun, UilSunset } from '@iconscout/react-unicons';
import { localTime } from './logic';

function WeatherCityTemp({ weather }) {
  if (!weather) return null;

  const { temp, feels_like, humidity, speed, sunrise, sunset, icon, name, country, description } = weather;
  const roundedTemp = Math.round(temp);
  const roundedFeels = Math.round(feels_like);

  return (
    <div className='text-gray-800 dark:text-red-200'>
      <div className='text-center justify-between py-3 space-y-2'>
        <p className='text-5xl'>{`${roundedTemp}`}&deg;C</p>
        <p className='text-2xl'>{`${name}, ${country}`}</p>
        <p className='text-xl'>{description}</p>
        
        <div className="flex flex-row justify-around space-x-2 py-3">
          <img
            src={`https://openweathermap.org/img/wn/${icon}.png`}
            alt="Weather Icon"
            className="w-20"
          />
          
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="flex flex-row items-center">
              <UilSun />
              <p className="font-light">Sunrise: <span>{localTime(sunrise, 'local', 'hh:mm a')}</span></p>
            </div>

            <div className="flex flex-row items-center">
              <UilSunset />
              <p className="font-light">Sunset: <span>{localTime(sunset, 'local', 'hh:mm a')}</span></p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row items-center">
              Feels like <span className='ml-1'>{`${roundedFeels}`}&deg;C</span>
            </div>
            <div className="flex flex-row items-center">
              Humidity <span className='ml-1'>{humidity}%</span>
            </div>
            <div className="flex flex-row items-center">
              Wind Speed <span className="ml-1">{speed} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCityTemp;
