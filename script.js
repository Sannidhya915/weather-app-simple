var inputvalue = document.querySelector('#cityinput')
var btn = document.querySelector('#add')
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')

const apiK = "82cbdfb9aad515b7d02be35f33bc05ef"

function conversion(val){
    return (val - 273).toFixed(3)
}

function capitalizeFirstLetterOfWords(string) {
    return string.replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });
}

btn.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputvalue.value + '&appid=' + apiK )
        .then(res => res.json())
        .then(data=>{
            var nameval = data['name']
            var descrip = data['weather']['0']['description']
            var temprature = data['main']['temp']
            var windspeed  =  data['wind']['speed']

            city.innerHTML = `Weather of <span>${nameval}<span>`
            temp.innerHTML = `Temprature : <span>${conversion(temprature)} °C`
            description.innerHTML = `Sky Conditions: <span>${capitalizeFirstLetterOfWords(descrip)}`
            wind.innerHTML = `Wind Speed : <span>${windspeed} Km/H<span>`
        })

        .catch(err => alert("Pleas input valid city name!"))
})
