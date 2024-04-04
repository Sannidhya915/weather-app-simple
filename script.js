var container = document.querySelector('.container');
var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');

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
            
            var weatherMain = data['weather'][0]['main']; // Use 'main' instead of 'description' for weather condition
            var gradientColors = getGradientColors(weatherMain);
            setGradientBackground(gradientColors);

            var nameval = data['name'];
            var temperature = data['main']['temp'];
            var windspeed = data['wind']['speed'];

            city.innerHTML = `Weather of <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${conversion(temperature)}°C</span>`;
            description.innerHTML = `Sky Conditions: <span>${capitalizeFirstLetterOfWords(weatherMain)}</span>`;
            wind.innerHTML = `Wind Speed: <span>${windspeed} Km/H</span>`;
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


function setGradientBackground(colors) {
    container.style.background = `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})`;
}
