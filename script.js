const apiKey = '6e3d314c9d102ddbb79e5df03fc44a57'; // OpenWeatherMap API key
const searchBtn = document.querySelector('button');
const cityInput = document.querySelector('input');
const weatherDisplay = document.querySelector('.weather-info');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;

    if (city === '') {
        alert('Please enter a city name!');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const { name } = data;
                const { temp, humidity } = data.main;
                const { description } = data.weather[0];
                const { speed } = data.wind;

                weatherDisplay.innerHTML = `
                    <h2>${name}</h2>
                    <p>Temperature: ${temp} °C</p>
                    <p>Description: ${description}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${speed} km/h</p>
                `;
            } else {
                weatherDisplay.innerHTML = `<p>City not found!</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            weatherDisplay.innerHTML = `<p>Something went wrong!</p>`;
        });
});

// Create a container for rain
const rainContainer = document.createElement('div');
rainContainer.className = 'rain';
document.body.appendChild(rainContainer);

// Generate water drops
for (let i = 0; i < 200; i++) { // Adjust the number of drops as needed
  const drop = document.createElement('div');
  drop.className = 'drop';
  drop.style.left = Math.random() * window.innerWidth + 'px'; // Random X position
  drop.style.animationDelay = Math.random() * 2 + 's'; // Random delay
  drop.style.animationDuration = Math.random() * 1 + 1 + 's'; // Random speed
  rainContainer.appendChild(drop);
}

