import axios from 'axios';
import { useState, useEffect } from 'react';
import Display from './components/Display';
import Input from './components/Input';




function App() {
const [countryInfos, setCountryInfos] = useState([])
const [selectedCountry, setSelectedCountry] = useState([])
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


const handleSearch = (e) => {
  setSearch(e.target.value)
  setShowSelected(false)
  setSelectedCountry([])    
}

return (
  <div>

    <Input value={search} onChange={handleSearch} />
    
    <Display searchResult={searchResult} setShowSelected={setShowSelected} setSelectedCountry={setSelectedCountry} showSelected={showSelected} selectedCountry={selectedCountry} />

  </div>
);
}

export default App;
