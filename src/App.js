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

// hello world!!!
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
      // to clear the search after submit use the next line, but I prefer not :)
      //e.target.children[0].value = ''; 
    } else {
      setError("Please enter a city");
    }
  };

  const getWeatherIcon = () => {
    const weatherDescription = (weather.weather[0]?.description || '').toLowerCase();

    const weatherIconMap = {
      'clear': <WiDaySunny className="weather-icon" />,
      'clouds': <WiCloud className="weather-icon" />,
      'rain': <WiRain className="weather-icon" />,
      'snow': <WiSnow className="weather-icon" />,
      'thunderstorm': <WiThunderstorm className="weather-icon" />,
      'mist': <WiFog className="weather-icon" />,
      'drizzle': <WiRain className="weather-icon" />,
      'fog': <WiFog className="weather-icon" />,
      'haze': <WiFog className="weather-icon" />,
      'smoke': <WiFog className="weather-icon" />,
      'dust': <WiFog className="weather-icon" />,
      'sand': <WiFog className="weather-icon" />,
      'ash': <WiFog className="weather-icon" />,
      'squall': <WiFog className="weather-icon" />,
      'tornado': <WiFog className="weather-icon" />,
    };

    // Loop through the keys and check if the description contains the key
    for (const key in weatherIconMap) {
      if (weatherDescription.includes(key)) {
        return weatherIconMap[key];
      }
    }

    return null; 
  };

  const getBackgroundClass = () => {
    const weatherDescription = (weather.weather[0]?.description || '').toLowerCase();
    const backgroundClassMap = {
      'clear': 'clear-weather',
      'rain': 'rainy-weather',
      'snow': 'snowy-weather',
      'thunderstorm': 'stormy-weather',
      'broken clouds': 'foggy-weather',
      'drizzle': 'rainy-weather',
      'fog': 'foggy-weather',
    };

    // Loop through the keys and check if the description contains the key
    for (const key in backgroundClassMap) {
      if (weatherDescription.includes(key)) {
        return backgroundClassMap[key];
      }
    }

    return ''; 
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
            <div className='weather-card'>
            {getWeatherIcon()}
            
            <h2>{weather.name}</h2>
            <p className="temperature">{weather.main.temp}°C</p>
            <p className="description">{weather.weather[0].description}</p>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
