import Notiflix from 'notiflix';
import { buildCardCountry, clearAll } from "./index";

function fetchCountries({ name }) {
    console.log(name)
    const contryFetch = fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`).then((response) => {
    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json()
}).then((country) => {
    if (country.length > 10) {
        clearAll(country)
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return
    }
    buildCardCountry(country)
}).catch(error => {
    Notiflix.Notify.failure("Oops, there is no country with that name");
    clearAll(error)
  })
};

export { fetchCountries }