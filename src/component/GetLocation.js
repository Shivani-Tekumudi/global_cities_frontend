import { useEffect, useState } from "react"

export default function GetLocation(){
    const [selectedCountry, getSelectedCountry] =useState('');
    const [selectedState, getSelectedState] = useState('');
    const [selectedCity, getSelectedCity] =useState('');
    const [countriesData, setCountriesData] =useState([]);
    const [statesData, setStatesData] =useState([]);
    const [cityData, setCityData] =useState([]);

useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
    .then((res) => res.json())
    .then((data) => setCountriesData(data))
    .catch((err) => console.error("Error fetching data:",err))
}, [])
useEffect(() => {
fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
.then((res) => res.json())
.then((data) => setStatesData(data))
   .catch((err) => console.error("Error fetching data:",err))
},[selectedCountry]);

// 
useEffect(() => {
fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
.then((res) => res.json())
.then((data) => setCityData(data))
   .catch((err) => console.error("Error fetching data:",err))
},[selectedCountry,selectedState])


    return(
        <div>
            <h1> Select Location</h1>
            <select value={selectedCountry} onChange={(e) => getSelectedCountry(e.target.value)}>
                <option value="" disabled selected>Select Country</option>
                {countriesData.map((ele) => <option key={ele} value={ele} >{ele}</option>)}
            </select>
             <select disabled={selectedCountry?false:true} value={selectedState} onChange={(e) => getSelectedState(e.target.value)}>
                <option value="" disabled selected>Select State</option>
                 {statesData.map((ele) => <option key={ele} value={ele} >{ele}</option>)}
            </select>
             <select disabled={selectedState?false:true} value={selectedCity} onChange={(e) => getSelectedCity(e.target.value)}>
                <option value="" disabled selected>Select City</option>
                {cityData.map((ele) => <option key={ele} value={ele} >{ele}</option>)}
            </select>
            {selectedCity?  <div style={{paddingTop:'30px'}}><span style={{display:'inline', fontWeight:700}}>You selected</span> <h2 style={{display:'inline', }}>{selectedCity}</h2>, <h2 style={{display:'inline', color:'grey'}} >{selectedState}, {selectedCountry}</h2></div>:''}
           
        </div>
    )
}