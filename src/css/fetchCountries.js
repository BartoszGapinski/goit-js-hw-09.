export fetchCountries

 const fetchCountries = (name) => {
    const fields = "name,capital,population,flags,languages";
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