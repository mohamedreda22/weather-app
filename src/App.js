import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from 'react-icons/wi';
const URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "f33a484cf794d08d0148764789aaba32";



function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({
    name: '',
    main: { temp: 0 },
    weather: [{ description: '' }],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${URL}weather?q=${search}&units=metric&appid=${API_KEY}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setWeather(result);
      } catch (error) {
        setError('Error fetching weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (search) {
      fetchData();
    }
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInput = e.target.children[0].value.trim();
    if (userInput) {
      setSearch(userInput);
    } else {
      setError("Please enter a city");
    }
  };

  const getWeatherIcon = () => {
    const weatherDescription = (weather.weather[0]?.main || '').toLowerCase();

    switch (weatherDescription) {
      case 'clear':
        return <WiDaySunny className="weather-icon" />;
      case 'clouds':
        return <WiCloud className="weather-icon" />;
      case 'rain':
        return <WiRain className="weather-icon" />;
      case 'snow':
        return <WiSnow className="weather-icon" />;
      case 'thunderstorm':
        return <WiThunderstorm className="weather-icon" />;
      case 'mist':
        return <WiFog className="weather-icon" />;
      default:
        return null;
    }
  };

  const getBackgroundClass = () => {
    const weatherDescription = (weather.weather[0]?.main || '').toLowerCase();
  
    switch (weatherDescription) {
      case 'clear':
        return 'clear-weather';
      case 'rain':
        return 'rainy-weather';
      case 'snow':
        return 'snowy-weather';
      case 'thunderstorm':
        return 'stormy-weather';
      case 'mist':
        return 'foggy-weather';
      default:
        return '';
    }
  };

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
    <div className="weather-app">
        <h1 className="app-title">Weather App</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input type="text" placeholder="Search for a city..." className="search-input" />
          <button type="submit" className="search-button">Search</button>
        </form>
        {loading ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="weather-info">
            {getWeatherIcon()}
            
            <h2>{weather.name}</h2>
            <p className="temperature">{weather.main.temp}°C</p>
            <p className="description">{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
