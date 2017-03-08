const API_KEY = '5f0a22160203c751f419ec75c1e0b509';

/* Executée lorsque l'utilisateur appuie sur entrée*/
function searchWeather() {
    var city = document.getElementById('city').value;
    getWeather(city);
}

/* Effectue la requête et récupère les infos */
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
                displayError(true, request);
            }
        }
    };
    request.send();
}

/* Affiche le message d'erreur */
function displayError(show, request = null) {
    let messageContainer = document.getElementById('message');

    if (show) {
        messageContainer.classList.remove('hidden');
        if (request !== null) {
            console.log(request);
        }
    } else {
        messageContainer.classList.add('hidden');
    }
}

/* Affiche les données */
function displayWeather(data) {
    let weatherContainer = document.getElementById('weather-container');
    let description = data.weather[0].description.capitalize();
    let icon = data.weather[0].icon;
    let urlImage = `http://openweathermap.org/img/w/${icon}.png`;
    let timeOfDay = 'day';

    if (icon[2] === 'n') {
        timeOfDay = 'night';
    }

    let weatherDiv = document.createElement('div');
    weatherDiv.innerHTML = `
        <h2 class="ui header">Weather in ${data.name}, ${data.sys.country}</h2>
        <div class="ui compact segments ${timeOfDay}">
                <div id="weather-result" class="ui center aligned compact segment">
                    <img alt="weather icon" src="${urlImage}"/>
                </div>
                <div class="ui center aligned compact segment">${data.main.temp}°C - ${description}</div>
                <div class="ui center aligned compact segment">${timeOfDay.capitalize()}</div
            </div>
        </div>`;

    weatherContainer.innerHTML = '';
    weatherContainer.appendChild(weatherDiv);
    weatherContainer.classList.remove('hidden');
    displayError(false);
}

String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.slice(1);
};
