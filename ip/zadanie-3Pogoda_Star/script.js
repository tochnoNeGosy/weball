document.addEventListener('DOMContentLoaded', () => {
    const weatherContainer = document.getElementById('weather-container');

    // Функция для получения данных о погоде
    async function fetchWeatherData() {
        const response = await fetch('https://wttr.in/Ulyanovsk?format=j1');
        const data = await response.json();
        return data.weather;
    }

    // Функция для форматирования даты
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    }

    // Функция для создания карточки прогноза погоды
    function createWeatherCard(weather) {
        const card = document.createElement('div');
        card.className = 'weather-card';

        const date = document.createElement('h3');
        date.textContent = formatDate(weather.date);
        card.appendChild(date);

        const temperature = document.createElement('p');
        temperature.textContent = `Температура: ${weather.avgtempC}°C`;
        card.appendChild(temperature);

        const weatherInfo = document.createElement('p');
        weatherInfo.textContent = `Погода: ${weather.hourly[0].weatherDesc[0].value}`;
        card.appendChild(weatherInfo);

        return card;
    }

    // Функция для отображения прогноза погоды
    async function displayWeather() {
        const weatherData = await fetchWeatherData();
        weatherData.forEach(day => {
            const card = createWeatherCard(day);
            weatherContainer.appendChild(card);
        });
    }

    displayWeather();
});
