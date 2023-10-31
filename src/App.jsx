import React, { useState, useEffect } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import Container from '@mui/material/Container';

const API_KEY = '53141570ac369582d13e2e60abfa8585';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState('');
  const [unitType, setUnitType] = useState('imperial');

  const fetchWeatherData = (e) => {
    if (e.key === 'Enter') {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitType}&appid=${API_KEY}`;
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => setWeatherData(data))
        .catch((error) => console.error('Error fetching weather data:', error));
      setLocation('');
    }
  };

  useEffect(() => {
    const fetchWeatherDataByLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitType}&appid=${API_KEY}`;
            fetch(API_URL)
              .then((response) => response.json())
              .then((data) => setWeatherData(data))
              .catch((error) =>
                console.error('Error fetching weather data:', error)
              );
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    };

    fetchWeatherDataByLocation();
  }, [unitType]);

  useEffect(() => {
    if (weatherData.weather && weatherData.weather.length > 0) {
      document.body.style = getBackgroundStyle(weatherData.weather[0].main);
      document.documentElement.style = getBackgroundStyle(
        weatherData.weather[0].main
      );
    } else {
      document.body.style = getBackgroundStyle('Mist');
      document.documentElement.style = getBackgroundStyle('Mist');
    }
  }, [weatherData.weather]);

  return (
    <Container maxWidth="sm">
      <SearchBar
        location={location}
        setLocation={setLocation}
        fetchWeatherData={fetchWeatherData}
      />
      <WeatherDisplay weatherData={weatherData} unitType={unitType} />
    </Container>
  );
}

function getBackgroundStyle(weatherCondition) {
  switch (weatherCondition) {
    case 'Clear':
      return 'background: linear-gradient(to bottom, #2193b0, #6dd5ed);';
    case 'Snow':
      return 'background: linear-gradient(to bottom, #2193b0, #ffffff);';
    case 'Rain':
      return 'background: linear-gradient(to bottom, #2C3E50, #3498db);';
    case 'Thunderstorm':
      return 'background: linear-gradient(to bottom, #bdc3c7, #2c3e50);';
    case 'Mist':
      return 'background: linear-gradient(to bottom, #00cdac, #ffffff);';
    default:
      return 'background: linear-gradient(to bottom, #2193b0, #ffffff);';
  }
}

export default App;
