import axios from 'axios';
import { useState, useEffect } from 'react';

const ShowDetails = ({country, selectedCountry, searchResult}) => {
    const [weather, setWeather] = useState(null)
    const api_key = process.env.REACT_APP_API_KEY


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


export default ShowDetails