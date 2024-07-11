import {useEffect, useState} from "react";
import services from "./services.js";


const App = () => {
    // Hooks
    const [value, setValue] = useState("")  // Typed value
    const [viewedCountry, setViewedCountry] = useState(null)  // country view if applicable
    const [allCountries, setAllCountries] = useState(null)  // all countries, set by effect hook
    const [viewedWeather, setViewedWeather] = useState(null)  // viewed temperature, set by effect hook, format = [temp, wind, code, description]
    const [showClose, setShowClose] = useState(false)

    // when viewedCountry is updated, if not null -> get the country's info
    useEffect(() => {
        console.log('effect run, weather is now', viewedWeather)

        if (viewedCountry) {
            console.log('fetching weather info...')
            services.getWeather(viewedCountry.latlng[0],viewedCountry.latlng[1]).then((t) =>
                setViewedWeather([t.main.temp, t.wind.speed, t.weather[0].id, t.weather[0].description]))
        }
    }, [viewedCountry])

    // get all countries on first render
    useEffect(() => {
        if (!allCountries) {
            console.log('get all countries run')
            console.log('fetching all countries...')
            services.getAll().then( data => {setAllCountries(data)} )   // TODO: change to actual API call
        }
    }, [])

    // Support functions
    const onInputChange = (event) => {
        setValue(event.target.value)
        setViewedCountry(null)
    }

    // Support components
    const WeatherView = () => {
        if (!viewedWeather) {
            return (<div>Weather Info Loading...</div>)
        } else {
            console.log(viewedWeather)
            return (<div>
                <p>Temperature: {Math.round((viewedWeather[0] - 273.15 + Number.EPSILON) * 100) / 100} °C</p>
                <img src={`/weather_icons/${services.weatherCodeToIcon(viewedWeather[2])}.png`} alt={viewedWeather[3]} />
                <p>Wind Speed: {viewedWeather[1]} m/s</p>
            </div>)
        }
    }

    const CountryView = ({countryObject}) => (<div>
            <div>
                <h1 style={{display: "inline", marginRight:"30px"}}>{countryObject.name.common}</h1>
                <button style={{display:showClose ? "inline" : "none"}} onClick={() => setViewedCountry(null)}>Close</button>
            </div>
            <p>Capital: &nbsp; {countryObject.capital[0]} <br /> Area: &nbsp; {countryObject.area}</p>
            <h2>Languages:</h2>
            <ul>
                {Object.entries(countryObject.languages).map(l => <li key={l[0]}>{l[1]}</li>)}
            </ul>
            <img src={countryObject.flags.png} alt={countryObject.flags.alt}/>
            <h2>Weather in {countryObject.name.common}</h2>
            <WeatherView />
        </div>)

    const CountriesDisplay = () => {
        if (!allCountries) {
            return (<div>Loading...</div>)
        } else {
            if (!viewedCountry) {
                const filteredCountries = allCountries.filter(c => c.name.common.toUpperCase().includes(value.toUpperCase()))
                if  (filteredCountries.length > 10) {return <p>Too many matches, please specify another filter</p>}  // > 10: too many matches message
                else if (filteredCountries.length > 1) {return (filteredCountries.map(fc => <div key={fc.cca3}>
                    <p style={{display:"inline", marginRight:"10px"}}>{fc.name.common}</p>
                    <button onClick={() => {setShowClose(true); setViewedCountry(fc)}}>Show Country</button>
                </div>))}  // 2 - 10: show entries with "show" button
                else if (filteredCountries.length === 0) {return <p>No matches, please specify another filter</p>}  // 0: no matches message
                else {setShowClose(false); setViewedCountry(filteredCountries[0])}  // 1: show the country
            }
            else {
                return (<CountryView countryObject = {viewedCountry} />)
            }
        }
    }


    return (<div>
        <div>
            <p style={{display:"inline", marginRight:10}}>Find Country: </p>
            <input onChange={onInputChange}></input>
        </div>
        <CountriesDisplay />
    </div>)
}

export default App
