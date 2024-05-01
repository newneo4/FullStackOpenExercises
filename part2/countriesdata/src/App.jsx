import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState('');
  const [searchCountry, setSearchCountry] = useState([]);
  const [countryDetails, setCountryDetails] = useState(null);
  const [weather, setWeather] = useState([]);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const countryNames = response.data.map((country) => country.name.common);
        setCountries(countryNames);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      setCountryDetails(null);
      filterByName();
    }
  }, [filterCountries, dataLoaded]);

  useEffect(() => {
    if (dataLoaded && searchCountry.length === 1) {
      fetchCountryDetails(searchCountry[0]);
    }
  }, [searchCountry, dataLoaded]);

  useEffect(() => {
    if (lat && lon) {
      renderWeather();
    }
  }, [lat, lon]);

  const handleFilterChange = (event) => {
    setFilterCountries(event.target.value);
  };

  const filterByName = () => {
    const filterName = countries.filter((country) =>
      country.toLowerCase().includes(filterCountries.toLowerCase())
    );
    setSearchCountry(filterName);
  };

  const fetchCountryDetails = (countryName) => {
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => {
        const countryData = response.data[0];
        setCountryDetails({
          name: countryData.name.common,
          capital: countryData.capital ? countryData.capital[0] : 'Unknown',
          area: countryData.area,
          languages: Object.values(countryData.languages),
          flag: countryData.flags.png,
        });
        fetchWeather(countryData.capital[0]);
      })
      .catch((error) => {
        console.error('Error fetching country details', error);
      });
  };

  const fetchWeather = (capital) => {
    axios
      .get(`https://api.openweathermap.org/geo/1.0/direct?q=${capital}&appid=${api_key}`)
      .then((response) => {
        setLat(response.data[0].lat);
        setLon(response.data[0].lon);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching weather data', error);
      });
  };

  const renderWeather = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then((response) => {
        setWeather([response.data]);
      })
      .catch((error) => {
        console.error('Error fetching weather data', error);
      });
  };

  const showDetails = (pickCountry) => {
    setFilterCountries(pickCountry);
  };

  const renderCountryDetails = () => {
    if (!countryDetails || !weather.length) return null;

    return (
      <>
        <h1>{countryDetails.name}</h1>
        <p>Capital: {countryDetails.capital}</p>
        <p>Area: {countryDetails.area}</p>
        <h2>Languages</h2>
        <ul>
          {countryDetails.languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={countryDetails.flag} alt={`${countryDetails.name} flag`} />
        <h3>Weather in {countryDetails.capital}</h3>
        <p>Temperature: {weather[0].main.temp}</p>
        <img src={`https://openweathermap.org/img/wn/${weather[0].weather[0].icon}.png`} alt="weather icon"/>
        <p>Wind: {weather[0].wind.speed} m/s</p>
      </>
    );
  };

  const renderCountries = () => {
    if (!dataLoaded) return null;

    if (searchCountry.length === 0 && filterCountries === '') return null;

    if (searchCountry.length === 1) {
      return renderCountryDetails();
    } else if (searchCountry.length >= 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      return (
        <>
          {searchCountry.map((country) => (
            <div
              key={country}
              style={{ display: 'flex', height: '40px', alignItems: 'center' }}
            >
              <p>{country} </p>
              <button
                style={{ display: 'flex', height: '20px' }}
                onClick={() => showDetails(country)}
              >
                show
              </button>
            </div>
          ))}
          {countryDetails && renderCountryDetails()}
        </>
      );
    }
  };

  return (
    <>
      <label htmlFor="busqueda">Find countries </label>
      <input
        type="search"
        id="busqueda"
        onChange={handleFilterChange}
        value={filterCountries}
      />
      {renderCountries()}
    </>
  );
}

export default App;
