import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [countryInfos, setCountryInfos] = useState([])
  const [selectedCountry, setSelectedCountry] = useState([])
  const [weather, setWeather] = useState(null)
  const [search, setSearch] = useState('')
  const [showSelected, setShowSelected] = useState(false)
  const api_key = process.env.REACT_APP_API_KEY

  
  const searchResult = countryInfos.filter(country =>((country.name.common).toLowerCase()).includes(search.toLowerCase()))
  
  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(res=> {
      setCountryInfos(res.data)
    })
  },[api_key])
  
  useEffect(()=>{
    const api = (cityName) => {
      return axios
              .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.name.common}&appid=${api_key}`)
              .then(res => {
                setWeather(res.data)
              }) 
      }

    if(selectedCountry.length){
      api(selectedCountry[0])
    }else if(searchResult.length === 1){
      api(searchResult[0])
    }

  },[api_key, selectedCountry, searchResult])

  const showDetails = (country) => {

          return <div>
                      <div>
                        <h1>{country.name.common}</h1>
                        <div>capital {country.capital}</div>
                        <div>area {country.area}</div>
                        <h3>languages:</h3>
                        <ul>
                          {Object.values(country.languages).map((lang, id) => <li key={id}>{lang}</li>)}
                        </ul>
                        <img src={country.flags.png} alt={`${country.name.common} flag`} />
                      </div>
                      {
                        weather !== null &&
                      <div>
                        <h2>Weather in {country.capital}</h2>
                        <div>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</div>
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' />
                        <div>wind {weather.wind.speed} m/s</div>
                      </div>
                      }
                      
                  </div>
       
  }



  const handleSearch = (e) => {
    setSearch(e.target.value)
    setShowSelected(false)
    setSelectedCountry([])    
  }
  const handleButton = (country) => {
    setShowSelected(!showSelected)
    setSelectedCountry(selectedCountry.concat(country))
  }
  return (
    <div>

      <div>
        find countries <input value={search} onChange={handleSearch} />
      </div>
      
      <div>
        {searchResult.length > 10 ? 'Too many matches, specify another filter' 
        : searchResult.length === 1 ? showDetails(searchResult[0])
        : showSelected ?  showDetails(selectedCountry[0])
        : searchResult.map(country => 
            <li key={country.name.common}>
                {country.name.common}
                <input type='button' value='show' onClick={()=>handleButton(country)} />
            </li>)}
      </div>

    </div>
  );
}

export default App;
