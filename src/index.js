import './css/styles.css';
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 500;

const refs = {
    inputEl: document.querySelector('input[id="search-box"]'),
    listCountryEl: document.querySelector('.country-list'),
    infoCountryEl: document.querySelector('.country-info'),
}

// console.log(refs.inputEl)
// console.log(refs.listCountryEl)
// console.log(refs.infoCountryEl)
let descCountry = {};
refs.inputEl.addEventListener('input', debounce(callBack, DEBOUNCE_DELAY))

function callBack(evt) {
    descCountry['name'] = evt.target.value.trim()
    console.log(descCountry)
    if (!descCountry.name) {
        refs.listCountryEl.innerHTML = '';
        refs.infoCountryEl.innerHTML = '';
        return
    }
    findeCountry(descCountry)
    console.log(evt.target.value)
}

function findeCountry({ name }) {
    console.log(name)
    const contryFetch = fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags`).then((response) => {
    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json()
}).then((country) => {
    console.log(country)
    if (country.length > 10) {
        alert(`MORE!!!`)
        return
    }
    buildCardCountry(country)
}).catch(error => {
    console.log(error)
    refs.listCountryEl.innerHTML = '';
    refs.infoCountryEl.innerHTML = '';
  });
}

function buildCardCountry(country) {
    console.log(country)
    
    if (country.length !== 1) {
        refs.infoCountryEl.innerHTML = ''
        refs.listCountryEl.innerHTML = country.map(makeGalaryItem).join('');
        return
    }
    refs.listCountryEl.innerHTML = '';
    refs.infoCountryEl.innerHTML = `<img src="${country[0].flags.svg}" alt="flag"/>
        <p>${country[0].population}</p>
        <p>${country[0].capital}</p>
        <p>${country[0].name}</p>`
}

function makeGalaryItem({name}) {
  return `<li>${name}</li>`
}

// https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags