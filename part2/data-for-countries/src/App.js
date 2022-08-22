import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [countryInfos, setCountryInfos] = useState([])
  const [search, setSearch] = useState('')
  // const [countriesToShow, setCountriesToShow] = useState(false)

  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(res=> {
      console.log('promised fulfilled')
      setCountryInfos(res.data)
    })
    
  },[])

  const searchResult = countryInfos.filter(country =>((country.name.common).toLowerCase()).includes(search.toLowerCase()))
  
  
   const countriesToShow =  searchResult.length === 1 ?
   <div>
      <h1>{searchResult[0].name.common}</h1>
      <div>capital {searchResult[0].capital}</div>
      <div>area {searchResult[0].area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.keys(searchResult[0].languages).map((lang, id) => <li key={id}>{searchResult[0].languages[lang]}</li>)}
      </ul>
      <img src={searchResult[0].flags.png} alt={`${searchResult[0].name.common} flag`} />
   </div> 
   : searchResult.map(country => <li key={country.name.common}>{country.name.common}</li>)

   
  
  

  return (
    <div>
      <div>
        find countries <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div>
        {searchResult.length > 10 ? 'Too many matches, specify another filter' : countriesToShow}
      </div>
    </div>
  );
}

export default App;
