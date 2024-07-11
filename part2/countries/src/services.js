import axios from 'axios'
const baseUrlCountries = 'https://studies.cs.helsinki.fi/restcountries/api/'
const baseUrlWeather = (lat, lon, key) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

const getAll = () => {
    console.log("Get all countries!")
    const request = axios.get(`${baseUrlCountries}/all`)
    return request.then(response => response.data)
}


function delay(t, val) {
    return new Promise(resolve => setTimeout(resolve, t, val));
}


const getWeather = (lat, lon) => {
    console.log("Get weather!")
    const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY
    const request = axios.get(baseUrlWeather(lat, lon, api_key))
    return request.then(response => response.data)
}

const weatherCodeToIcon = (code) => {
    const startsWith = Math.floor(code / 100)
    if (startsWith === 2) {return "thunderstorm"}
    else if (startsWith === 3) {return "drizzle"}
    else if (startsWith === 5) {return "rain"}
    else if (startsWith === 6) {return "snow"}
    else if (startsWith === 7) {return "atmosphere"}
    else if (code === 800) {return "clear"}
    else if (code === 801) {return "clouds_few"}
    else if (code === 802) {return "clouds"}
    else if (startsWith === 8) {return "clouds_over"}
    else {return "invalid"}
}


export default { getAll, getWeather, weatherCodeToIcon }