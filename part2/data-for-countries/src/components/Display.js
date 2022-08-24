
import ShowDetails from './ShowDetails';

const Display =({searchResult, setShowSelected, setSelectedCountry, showSelected, selectedCountry})=> {


    const handleButton = (country) => {
        setShowSelected(!showSelected)
        setSelectedCountry(selectedCountry.concat(country))
      }


      return <div>
                {searchResult.length > 10 ? 'Too many matches, specify another filter' 
                : searchResult.length === 1 ? <ShowDetails country={searchResult[0]} selectedCountry={selectedCountry} searchResult={searchResult} />

                : showSelected ?  <ShowDetails country={selectedCountry[0]} selectedCountry={selectedCountry} searchResult={searchResult} />

                : searchResult.map(country => 
                    <li key={country.name.common}>
                        {country.name.common}
                        <input type='button' value='show' onClick={()=>handleButton(country)} />
                    </li>)}
            </div>
}

export default Display