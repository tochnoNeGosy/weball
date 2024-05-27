import React from 'react';
import './App.css';

function Header() {
  return (
    <header>
      <h1>Прогноз погоды на ближайшее время</h1>
    </header>
  );
}

function WeatherCard({ weather }) {
  const formattedDate = new Date(weather.date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="weather-card">
      <h3>{formattedDate}</h3>
      <p>Температура: {weather.avgtempC}°C</p>
      <p>Погода: {weather.hourly[0].weatherDesc[0].value}</p>
    </div>
  );
}

function App() {
  const [weatherData, setWeatherData] = React.useState([]);

  React.useEffect(() => {
    async function fetchWeatherData() {
      const response = await fetch('https://wttr.in/Ulyanovsk?format=j1');
      const data = await response.json();
      setWeatherData(data.weather);
    }

    fetchWeatherData();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <div className="weather-container">
          {weatherData.map((day, index) => (
            <WeatherCard key={index} weather={day} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
