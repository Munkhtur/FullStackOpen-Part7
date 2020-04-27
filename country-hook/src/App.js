import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState({
    data: {},
    found: false,
  });
  const getCountry = async (name) => {
    try {
      const result = await axios.get(`
      https://restcountries.eu/rest/v2/name/${name}?fullText=true`);
      setCountry({ ...country, data: result, found: true });
    } catch (error) {
      setCountry({ ...country, found: false });
    }
  };

  useEffect(() => {
    getCountry(name);
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  const countryData = country.data.data;
  console.log(countryData);
  console.log(country.found);
  if (!countryData) {
    return null;
  }
  if (!country.found) {
    return <div>not found...</div>;
  }
  return (
    <div>
      <h3>{countryData[0].name} </h3>
      <div>capital {countryData[0].capital} </div>
      <div>population {countryData[0].population}</div>
      <img
        src={countryData[0].flag}
        height='100'
        alt={`flag of ${countryData[0].name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);
  console.log(country);
  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
