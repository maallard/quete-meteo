const API_KEY = '5f0a22160203c751f419ec75c1e0b509';

function searchWeather() {
    var city = document.getElementById('city').value;

    getWeather(city);
}

function getWeather(city) {
    let request = new XMLHttpRequest();
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    request.open('GET', url, true);
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                displayWeather(data, city);
            } else {
                displayError(request);
            }
        }
    };
    request.send();
}

function displayError(show) {
    let messageContainer = document.getElementById('message');

    if (show) {
        messageContainer.classList.remove('hidden');
    } else {
        messageContainer.classList.add('hidden');
    }
}

function displayWeather(data) {
    let weatherContainer = document.getElementById('weather-container');
    let description = capitalize(data.weather[0].description);
    let urlImage = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    let weatherDiv = document.createElement('div');
    weatherDiv.innerHTML = `
        <h2 class="ui left aligned header">Weather in ${data.name}</h2>
        <div id="weather-result" class="ui center aligned segment">
            <img alt="weather icon" src="${urlImage}" class="ui images" />
            <p>${data.main.temp}°C - ${description}</p>
        </div>`;

    weatherContainer.innerHTML = '';
    weatherContainer.appendChild(weatherDiv);
    weatherContainer.classList.remove('hidden');
    displayError(false);
}

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}
