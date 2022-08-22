import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [countryInfos, setCountryInfos] = useState([])
  const [search, setSearch] = useState('')
  const [showSelected, setShowSelected] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState([])
  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(res=> {
      console.log('promised fulfilled')
      setCountryInfos(res.data)
    })
    
  },[])

  const searchResult = countryInfos.filter(country =>((country.name.common).toLowerCase()).includes(search.toLowerCase()))
  
  const showDetails = (country) => {
          return( <div>
                    <h1>{country.name.common}</h1>
                    <div>capital {country.capital}</div>
                    <div>area {country.area}</div>
                    <h3>languages:</h3>
                    <ul>
                      {Object.values(country.languages).map((lang, id) => <li key={id}>{lang}</li>)}
                    </ul>
                    <img src={country.flags.png} alt={`${country.name.common} flag`} />
                  </div>
                )
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
        : searchResult.length === 1 ? (showDetails(searchResult[0]))
        : showSelected ?  showDetails(selectedCountry[0])
        : searchResult.map(country => <li key={country.name.common}>
                                        {country.name.common}
                                        <input type='button' value='show' onClick={()=>handleButton(country)} />
                                      </li>)}
        
      </div>
    </div>
  );
}

export default App;
