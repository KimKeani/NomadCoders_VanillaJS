const weather = document.querySelector(".js-weather");

const API_KEY = "646865413124c9e24ffe673bf0fede38"
const COORDS = "coords"

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
       const temperature = json.main.temp;
       const place = json.name;
       const weatherInfo = json.weather[0].main
       weather.innerText = `Weather: ${weatherInfo} / Temperature: ${temperature} ℃`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSeucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    alert('We cant access to your geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSeucces, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();