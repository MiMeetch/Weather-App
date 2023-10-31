import React from 'react';
import TextField from '@mui/material/TextField';

function SearchBar({ location, setLocation, fetchWeatherData }) {
  return (
    <TextField
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      onKeyDown={fetchWeatherData}
      label="Enter A Location"
      variant="outlined"
      fullWidth
      style={{ margin: '40px 0px' }}
    />
  );
}

export default SearchBar;
