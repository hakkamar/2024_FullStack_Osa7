import React, { useState, useEffect } from "react";
import axios from "axios";

let ekaKerta = true;

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/";
//const alkuHakuUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/finland";
let hakuUrli = "";

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  if (name) {
    hakuUrli = baseUrl + name;
  }

  const getMaa = () => {
    const request = axios.get(hakuUrli);
    return request
      .then((response) => response.data)
      .catch((error) => {
        return null;
      });
  };

  useEffect(() => {
    if (name) {
      getMaa().then((initialMaat) => {
        setCountry(initialMaat);
      });
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (ekaKerta) {
    ekaKerta = false;
    return <div>Write a country...</div>;
  }

  if (!country) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>
        {country.name.common} / {country.name.official}
      </h3>
      <h4>
        in {country.region} ( {country.subregion} ){" "}
      </h4>{" "}
      {country.independent ? (
        <div>independent</div>
      ) : (
        <div>NOT independent</div>
      )}
      <div>capital: {country.capital} </div>
      <div>population: {country.population}</div>
      <br></br>
      <img src={country.flags.png} height="100" alt={country.flags.alt} />{" "}
      {country.coatOfArms.png !== undefined ? (
        <img
          src={country.coatOfArms.png}
          height="100"
          alt={`vaakuna ${country.name.common}`}
        />
      ) : (
        " "
      )}
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

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
