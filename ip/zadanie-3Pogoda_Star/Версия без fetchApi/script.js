document.addEventListener('DOMContentLoaded', () => {
    const weatherContainer = document.getElementById('weather-container');

    // Пример данных о прогнозе погоды
    const weatherData = [
        { date: '2024-05-18', temperature: '22°C', additionalInfo: 'Ясно' },
        { date: '2024-05-19', temperature: '24°C', additionalInfo: 'Облачно' },
        { date: '2024-05-20', temperature: '19°C', additionalInfo: 'Дождь' },
        { date: '2024-05-21', temperature: '21°C', additionalInfo: 'Переменная облачность' }
    ];

    // Функция для создания карточки прогноза погоды
    function createWeatherCard(weather) {
        const card = document.createElement('div');
        card.className = 'weather-card';

        const date = document.createElement('h3');
        date.textContent = weather.date;
        card.appendChild(date);

        const temperature = document.createElement('p');
        temperature.textContent = `Температура: ${weather.temperature}`;
        card.appendChild(temperature);

        if (weather.additionalInfo) {
            const additionalInfo = document.createElement('p');
            additionalInfo.textContent = weather.additionalInfo;
            card.appendChild(additionalInfo);
        }

        return card;
    }

    // Добавление всех карточек на страницу
    weatherData.forEach(weather => {
        const card = createWeatherCard(weather);
        weatherContainer.appendChild(card);
    });
});
