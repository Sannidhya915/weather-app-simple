var container = document.querySelector('.container');
var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var weatherIconElement = document.querySelector('#weatherIcon');
var weatherMain = "clear"; 

const apiKey = "82cbdfb9aad515b7d02be35f33bc05ef";

function conversion(val) {
    return (val - 273).toFixed(3);
}

function capitalizeFirstLetterOfWords(string) {
    return string.replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
}

btn.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputvalue.value + '&appid=' + apiKey)
        .then(res => res.json())
        .then(data => {
            if (data.cod === "404") {
                throw new Error("City not found!");
            }
            
            var weatherMain = data['weather'][0]['main']; 
            var gradientColors = getGradientColors(weatherMain);
            setGradientBackground(gradientColors);

            var nameval = data['name'];
            var temperature = data['main']['temp'];
            var windspeed = data['wind']['speed'];

            city.innerHTML = `Weather of <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${conversion(temperature)}°C</span>`;
            description.innerHTML = `Sky Conditions: <span>${capitalizeFirstLetterOfWords(weatherMain)}</span>`;
            wind.innerHTML = `Wind Speed: <span>${windspeed} Km/H</span>`;
            weatherIconElement.innerHTML = setWeatherIcon(weatherMain);
        })
        .catch(err => alert(err.message));
});

function getGradientColors(weatherMain) {
    // Define gradient colors based on weather conditions
    switch (weatherMain.toLowerCase()) {
        case 'thunderstorm':
            return ['#51516d', '#282846']; // Dark blue gradient colors for thunderstorm
        case 'drizzle':
        case 'rain':
            return ['#6c757d', '#343a40']; // Grey gradient colors for rain
        case 'snow':
            return ['#e6e6e6', '#b3b3b3']; // Light grey gradient colors for snow
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'sand':
        case 'ash':
            return ['#c2c2c2', '#8c8c8c']; // Grey gradient colors for mist, smoke, haze, dust, sand, ash
        case 'clear':
            return ['#82caff', '#3c90ff']; // Blue gradient colors for clear sky
        case 'fog':
            return ['#f2f2f2', '#cccccc']; // Light grey gradient colors for fog
        case 'squall':
            return ['#ff8000', '#ff4d00']; // Orange gradient colors for squall
        case 'tornado':
            return ['#000000', '#808080']; // Black gradient colors for tornado
        default:
            return ['#f0f0f0', '#c9c9c9']; // Default gradient colors
    }
}

// City Assit
document.addEventListener('DOMContentLoaded', function() {
    var cityInput = document.getElementById('cityinput');

    cityInput.addEventListener('input', function() {
        var inputValue = cityInput.value;
        
        if (inputValue.length >= 2) {
            fetch('https://api.openweathermap.org/data/2.5/find?q=' + inputValue + '&type=like&sort=population&cnt=10&appid=' + apiKey)
                .then(response => response.json())
                .then(data => {
                    var cities = data.list.map(function(city) {
                        return city.name + ", " + city.sys.country;
                    });
                    displayAutocompleteSuggestions(cities);
                })
                .catch(error => {
                    console.error('Error fetching city suggestions:', error);
                });
        }
    });

    function displayAutocompleteSuggestions(suggestions) {
        var autocompleteList = document.getElementById('autocomplete-list');
        autocompleteList.innerHTML = '';

        suggestions.forEach(function(suggestion) {
            var option = document.createElement('option');
            option.value = suggestion;
            autocompleteList.appendChild(option);
        });
    }
});


function setGradientBackground(colors) {
    container.style.background = `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})`;
}

function setWeatherIcon(weatherMain) {
    console.log("Weather Main:", weatherMain);
    switch (weatherMain.toLowerCase()) {
        case 'thunderstorm':
            return '<i class="fa-light fa-cloud-bolt fa-xl" style="color: #FFD43B;"></i>'; 
        case 'drizzle':
            return '<i class="fa-solid fa-cloud-rain fa-xl" style="color: #74C0FC;"></i>'; 
        case 'rain':
            return '<i class="fa-solid fa-cloud-showers-heavy fa-xl" style="color: #002f80;"></i>'; 
        case 'snow':
            return '<i class="fa-solid fa-snowflake fa-xl" style="color: #74C0FC;"></i>'; 
        case 'mist':
            return '<i class="fa-regular fa-smog fa-xl" style="color: #74C0FC;"></i>'; 
        case 'smoke':
            return '<i class="fa-solid fa-smog fa-xl"></i>'; 
        case 'clear':
            return '<i class="fa-regular fa-sun fa-xl" style="color: #FFD43B;"></i>'; 
        case 'ash':
            return '<i class="fa-regular fa-fire fa-xl" style="color: #f59324;"></i>'; 
        case 'sand':
            return '<i class="fa-solid fa-wind fa-xl" style="color: #FFD43B;"></i>'; 
        case 'fog':
            return '<i class="fa-solid fa-smog fa-xl" style="color: #0ab6f0;"></i>'; 
        case 'squall':
            return '<i class="fa-duotone fa-wind fa-xl" style="--fa-primary-color: #1a9cff; --fa-secondary-color: #1a9cff;"></i>'; // Wind icon for squall
        case 'tornado':
            return '<i class="fa-solid fa-tornado fa-xl" style="color: #74C0FC;"></i>'; 
        case 'clouds':
            return '<i class="fa-solid fa-cloud fa-xl" style="color: #74C0FC;"></i>';
        default:
            return '<i class="fas fa-question"></i>'; // Default icon for unknown weather
    }
}
