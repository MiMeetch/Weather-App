import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import {
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiDayHaze,
  WiCloudy,
} from 'react-icons/wi';
import Grid from '@mui/material/Grid';

const GlassMorphismPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  padding: '16px',
}));

const WeatherIcon = styled('div')({
  fontSize: '8rem',
});

function WeatherDisplay({ weatherData, unitType }) {
  const weatherIcon = () => {
    switch (weatherData.weather[0].main) {
      case 'Clear':
        return <WiDaySunny />;
      case 'Rain':
        return <WiRain />;
      case 'Snow':
        return <WiSnow />;
      case 'Thunderstorm':
        return <WiThunderstorm />;
      case 'Mist':
        return <WiDayHaze />;
      case 'Clouds':
        return <WiCloudy />;
      default:
        return <WiDaySunny />;
    }
  };

  return (
    <GlassMorphismPaper elevation={0}>
      {weatherData.main && (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5">{weatherData.name}</Typography>
            <Typography variant="h3">
              {Math.round(weatherData.main.temp)}&deg;
              {unitType === 'imperial' ? 'F' : 'C'}
            </Typography>
            <Typography variant="body1">
              {weatherData.weather[0].main}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            container
            alignItems="center"
            justifyContent="center"
          >
            <WeatherIcon>{weatherIcon()}</WeatherIcon>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Feels Like: {Math.round(weatherData.main.feels_like)}&deg;
              {unitType === 'imperial' ? 'F' : 'C'}
            </Typography>
            <Typography variant="body1">
              Humidity: {weatherData.main.humidity}%
            </Typography>
            <Typography variant="body1">
              Wind Speed: {Math.round(weatherData.wind.speed)} MPH
            </Typography>
          </Grid>
        </Grid>
      )}
    </GlassMorphismPaper>
  );
}

export default WeatherDisplay;
