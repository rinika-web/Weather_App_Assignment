import React, { useState, useEffect } from 'react';
import { UilBrightness, UilMoon } from '@iconscout/react-unicons'
import Dateandtime from './everyfile/dateandtime';
import WeatherSearchLocation from './everyfile/weatherSearchLocation';
import WeatherCityTemp from './everyfile/weatherCityTemp';
import getWeatherData from './everyfile/logic';

function App() {
  const [queries, setQueries] = useState([{ q: 'kolkata' }, { q: 'london' }]); // Multiple queries
  const [units, setUnits] = useState('metric');
  const [weatherData, setWeatherData] = useState([]); // Multiple weather data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const dataPromises = queries.map(query => getWeatherData({ ...query, units }));
        const dataResults = await Promise.all(dataPromises);
        setWeatherData(dataResults);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [queries, units]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const addQuery = query => {
    setQueries(prevQueries => {
      const newQueries = [query, ...prevQueries];
      if (newQueries.length > 4) newQueries.pop(); // Remove the oldest city if more than 4
      return newQueries;
    });
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-md mt-4 px-5 py-5 bg-emerald-200 dark:bg-blue-950 text-gray-800">
        <button onClick={toggleTheme} className="pg-2 text-stone-800 dark:text-stone-200 rounded-2xl">
          {theme === 'light' ? <UilMoon /> : <UilBrightness/>}
        </button>

        <WeatherSearchLocation addQuery={addQuery} /> 

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        {weatherData.map((weather, index) => (
          <div key={index}>
            <WeatherCityTemp weather={weather} />
          </div>
        ))}
        
        <Dateandtime />
      </div>
    </div>
  );
}

export default App;
