import {useEffect, useState} from "react";
import services from "./services.js";


const App = () => {
    const [value, setValue] = useState("")
    const [allCountries, setAllCountries] = useState(null)

    useEffect(() => {
        services.getAll().then( data => {setAllCountries(data)} )
    }, []);

    const onInputChange = (event) => {
        setValue(event.target.value)
    }

    const CountriesDisplay = () => {
        if (!allCountries) {
            return (<div>Loading...</div>)
        } else {
            const filteredCountries = allCountries.filter(c => c.name.common.toUpperCase().includes(value.toUpperCase()))
            if  (filteredCountries.length > 10) {return <p>Too many matches, please specify another filter</p>}
            else if (filteredCountries.length > 1) {return (filteredCountries.map(fc => <p key={fc.cca3}>{fc.name.common}</p>))}
            else if (filteredCountries.length === 0) {return <p>No matches, please specify another filter</p>}
            else {return (<CountryView countryObject = {filteredCountries[0]} />)}
        }
    }

    const CountryView = ({countryObject}) => {
        return (<div>
            <h1>{countryObject.name.common}</h1>
            <p>Capital: &nbsp; {countryObject.capital[0]} <br /> Area: &nbsp; {countryObject.area}</p>
            <h2>Languages:</h2>
            <ul>
                {Object.entries(countryObject.languages).map(l => <li key={l[0]}>{l[1]}</li>)}
            </ul>
            <img src={countryObject.flags.png} alt={countryObject.flags.alt}/>
        </div>)
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
