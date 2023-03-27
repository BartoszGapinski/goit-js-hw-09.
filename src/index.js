import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from "notiflix";

//import "./css/fetchCountries.js"
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const fetchCountries = (name) => {
  
  const fields = "name.official,capital,population,flags,languages";
  const url = `https://restcountries.com/v3.1/name/${name}?fields=${fields}`;
  
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log(error)
        throw new Error("Country not found");
       
      }
      return response.json();
    })
}
    


searchBox.addEventListener("input", debounce(() => {
    const searchTerm = searchBox.value.trim();

    
      countryList.innerHTML = "";
      countryInfo.innerHTML = "";
      

    fetchCountries(searchTerm)
      .then((countries) => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            "Too many matches found. Please enter a more specific name."
          );
        
        } else if (countries.length > 1) {
            countries.forEach((country)=>{
                const li = document.createElement("li");
                li.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.official}" width="100" height="auto"> ${country.name.official}`;
                countryList.appendChild(li);
            })
          

        } else if (countries.length === 1) {
          const country = countries[0];
    
          countryInfo.innerHTML = `
            <h2>${country.name.official}</h2>
            <p>Capital: ${country.capital[0]}</p>
            <p>Population: ${country.population}</p>
            <img src="${country.flags.svg}" alt="${country.name.official} flag" width="100" height="auto">
            <p>Languages: ${Object.values(country.languages).join(", ")}</p>
          `;
        } else {
          Notiflix.Notify.failure("Oops, there is no country with that name")
        }
      })
      .catch((error) => {
        console.error(error);
        Notiflix.Notify.failure("Oops, there is no country with that name");
        
      });
  }, DEBOUNCE_DELAY)
);

