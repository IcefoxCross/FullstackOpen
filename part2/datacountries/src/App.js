/* jshint esversion: 9 */
import React, {useState,useEffect} from 'react';
import axios from 'axios';

const Weather = ({weather, condition}) => {

  return (
    <div>
      <p><b>temperature: </b>{weather.temp_c} Celsius</p>
      <img src={condition.icon}></img>
      <p><b>wind: </b>{weather.wind_kph} kph direction {weather.wind_dir}</p>
    </div>
  )
}

const Country = ({country}) => {
  const [weather, setWeather] = useState({});
  const [condition, setCondition] = useState({});

  useEffect(() => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=8498fa5f8782473f97d42352192207&q=${country.capital}`)
      .then(response => {
        setWeather(response.data.current);
        setCondition(response.data.current.condition);
      })
  },[]);

  const handleClick = () => {
    const c = document.getElementById(country.name);
    if (c.style.display === 'none'){
      c.style.display = 'block';
    } else {
      c.style.display = 'none';
    }
  }

  return (
    <div>
      <div>
        {country.name} <button onClick={handleClick}>Show</button>
      </div>
      <div id={country.name} style={{display: 'none'}}>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} height="100" width="200" ></img>
        <h2>Weather in {country.capital}</h2>
        <Weather weather={weather} condition={condition} />
      </div>
    </div>
  )
}

const Countries = ({countries}) => {

  if (countries.length > 10) {
    return (
      <p>Too many matches, please specify another filter</p>
    )
  }
  else {
    return (
      <div>
        {countries.map(country => <Country key={country.name} country={country} />)}
      </div>
    )
  }
}

const App = () => {

  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  },[]);

  const handleSearchCountryChange = (event) => {
    setSearchCountry(event.target.value);
  }

  const countriesToShow = (searchCountry === '')
        ? countries
        : countries.filter(country => country.name.toLowerCase().includes(searchCountry));

  return (
    <div>
      <form>
        <div>
          find countries <input value={searchCountry} onChange={handleSearchCountryChange} />
        </div>
      </form>
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App;
