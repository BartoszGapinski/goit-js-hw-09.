import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from "notiflix";

//import "./css/fetchCountries.js"
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const fetchCountries = (name) => {
  console.log('fetching data for', name);
  const fields = "name.official,capital,population,flags.svg,languages";
  const url = `https://restcountries.com/v3.1/name/${name}?fields=${fields}&fullText=true`;
  console.log(countries)
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Country not found");
        console.log(error)
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
    console.log(error)
}

debugger
searchBox.addEventListener("input", debounce(() => {
    const searchTerm = searchBox.value.trim();

    if (searchTerm === "") {
      countryList.innerHTML = "";
      countryInfo.innerHTML = "";
      return;
    }
    console.log(searchTerm)
    debugger;
    fetchCountries(searchTerm)
      .then((countries) => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            "Too many matches found. Please enter a more specific name."
          );
          countryList.innerHTML = "";
          countryInfo.innerHTML = "";
        } else if (countries.length >= 2 && countries.length <= 10) {
          countryInfo.innerHTML = "";
          const countryItems = countries
            .map((country) => {
              const li = document.createElement("li");
              const flagImg = document.createElement("img");
              flagImg.src = country.flags.svg;
              flagImg.alt = `${country.name.official} flag`;
              li.appendChild(flagImg);
              li.appendChild(document.createTextNode(country.name.official));
              return li;
            })
            .join("");
          countryList.innerHTML = countryItems;
        } else if (countries.length === 1) {
          const country = countries[0];
          countryList.innerHTML = "";
          countryInfo.innerHTML = `
            <h2>${country.name.official}</h2>
            <p>Capital: ${country.capital[0]}</p>
            <p>Population: ${country.population}</p>
            <img src="${country.flags.svg}" alt="${country.name.official} flag">
            <p>Languages: ${country.languages.map((lang) => lang.name).join(", ")}</p>
          `;
        } else {
          countryList.innerHTML = "";
          countryInfo.innerHTML = "";
        }
      })
      .catch((error) => {
        console.error(error);
        Notiflix.Notify.failure("Oops, there is no country with that name");
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
      });
  }, DEBOUNCE_DELAY)
);

